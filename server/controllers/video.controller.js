const videoModel = require("../models/video.model");
const videoCapsuleModel = require("../models/videoCapsule.model");

module.exports.setVideoCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await videoCapsuleModel.findOne({ userId });

    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Thought Capsule already exists for this user" });
    }

    const newVideoCapsule = await videoCapsuleModel.create({
      userId,
      timeToUnlock,
      videos: [],
    });

    if (!newVideoCapsule) {
      return res
        .status(500)
        .json({ message: "Failed to create Video capsule" });
    }

    return res.status(201).json({
      message: "Video Capsule created successfully",
      success: true,
      capsule: newVideoCapsule,
    });
  } catch (error) {
    console.log("Error during setImageCapsule: ", error.message);
  }
};

module.exports.addVideos = async (req, res) => {
  try {
    const { video, videoDescription } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!video || !videoDescription) {
      return res
        .status(400)
        .json({ message: "Video and Video description are required" });
    }

    const newVideo = await videoModel.create({
      video,
      videoDescription,
    });

    if (!newVideo) {
      return res.status(500).json({ message: "Failed to add video" });
    }

    const updatedCapsule = await videoCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { videos: newVideo._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "Failed to add Video to capsule" });
    }

    return res.status(201).json({
      message: "Videos added successfully to capsule",
      success: true,
      videos: newVideo,
      videoCapsuleModel: updatedCapsule,
    });
  } catch (error) {
    console.log("Error during addVideos: ", error.message);
  }
};

module.exports.getVideos = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const videoCapsule = await videoCapsuleModel
      .findOne({ userId })
      .populate("videos");

    if (!videoCapsule) {
      return res.status(404).json({ message: "No videos found" });
    }

    if (Date.now() < new Date(videoCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: videoCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Videos fetched successfully",
      success: true,
      videos: videoCapsule.videos,
    });
  } catch (error) {
    console.log("Error during fetch videos:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
