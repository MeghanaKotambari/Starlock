const imageCapsuleModel = require("../models/imageCapsule.model");
const imagesModel = require("../models/images.model");

module.exports.setImageCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await imageCapsuleModel.findOne({ userId });

    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Image Capsule already exists for this user" });
    }

    const newImageCapsule = await imageCapsuleModel.create({
      userId,
      timeToUnlock,
      images : [],
    });

    if (!newImageCapsule) {
      return res
        .status(500)
        .json({ message: "Failed to create image capsule" });
    }

    return res.status(201).json({
      message: "Image Capsule created successfully with Time to unlock",
    });
  } catch (error) {
    console.log("Error during setImageCapsule: ", error.message);
  }
};

module.exports.addImages = async (req, res) => {
  try {
    const { image, imageDescription } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!image || !imageDescription) {
      return res
        .status(400)
        .json({ message: "Image and Image description are required" });
    }

    const newImage = await imagesModel.create({
      image,
      imageDescription,
    });

    if (!newImage) {
      return res.status(500).json({ message: "Failed to add image" });
    }

    const updatedCapsule = await imageCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { images: newImage._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "Failed to add thought to capsule" });
    }

    return res.status(201).json({
      message: "Image added successfully to capsule",
      success: true,
      images: newImage,
      imageCapsuleModel: updatedCapsule,
    });
  } catch (error) {
    console.log("Error during addImages: ", error.message);
  }
};

module.exports.getImages = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const imageCapsule = await imageCapsuleModel
      .findOne({ userId })
      .populate("images"); //

    if (!imageCapsule) {
      return res.status(404).json({ message: "No images found" });
    }

    if (Date.now() < new Date(imageCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: imageCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Images fetched successfully",
      success: true,
      images: imageCapsule.images,
    });
  } catch (error) {
    console.log("Error during fetch images:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
