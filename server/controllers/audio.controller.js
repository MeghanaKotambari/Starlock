const audioModel = require("../models/audio.model");
const audioCapsuleModel = require("../models/audioCapsule.model");

module.exports.setAudioCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await audioCapsuleModel.findOne({ userId });

    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Audio Capsule already exists for this user" });
    }

    const newAudioCapsule = await audioCapsuleModel.create({
      userId,
      timeToUnlock,
      audios: [],
    });

    return res.status(201).json({
      message: "Audio Capsule created successfully",
      success: true,
      capsule: newAudioCapsule,
    });
  } catch (error) {
    console.log("Error during setAudioCapsule: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addAudios = async (req, res) => {
  try {
    const { audio, audioDescription } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!audio || !audioDescription) {
      return res
        .status(400)
        .json({ message: "Audio and Audio description are required" });
    }

    const newAudio = await audioModel.create({
      audio,
      audioDescription,
    });

    const updatedCapsule = await audioCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { audios: newAudio._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "No audio capsule found for this user" });
    }

    return res.status(201).json({
      message: "Audio added successfully to capsule",
      success: true,
      audio: newAudio,
      capsule: updatedCapsule,
    });
  } catch (error) {
    console.log("Error during addAudios: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAudios = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const audioCapsule = await audioCapsuleModel
      .findOne({ userId })
      .populate("audios");

    if (!audioCapsule) {
      return res.status(404).json({ message: "No audio capsule found" });
    }

    if (Date.now() < new Date(audioCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: audioCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Audios fetched successfully",
      success: true,
      audios: audioCapsule.audios,
    });
  } catch (error) {
    console.log("Error during getAudios:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
