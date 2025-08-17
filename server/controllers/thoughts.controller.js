const thoughtCapsuleModel = require("../models/thoughtCapsule.model");
const thoughtsModel = require("../models/thoughts.model");

module.exports.setThoughtCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await thoughtCapsuleModel.findOne({ userId });
    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Thought Capsule already exists for this user" });
    }

    const newThoughtCapsule = await thoughtCapsuleModel.create({
      userId,
      timeToUnlock,
      thoughts: [],
    });

    if (!newThoughtCapsule) {
      return res
        .status(500)
        .json({ message: "Failed to create thought capsule" });
    }

    return res.status(201).json({
      message: "Thought Capsule created successfully",
      success: true,
      thoughtCapsule: newThoughtCapsule,
    });
  } catch (error) {
    console.log("Error in setting time to unlock : ", error.message);
  }
};

module.exports.addThoughts = async (req, res) => {
  try {
    const userId = req.userId;
    const { thoughtTitle, thoughtDescription } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!thoughtTitle || !thoughtDescription) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newThought = await thoughtsModel.create({
      thoughtTitle,
      thoughtDescription,
    });

    if (!newThought) {
      return res.status(400).json({ message: "Failed to add thought" });
    }

    const updatedCapsule = await thoughtCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "Failed to add thought to capsule" });
    }

    return res.status(201).json({
      message: "Thought added successfully to capsule",
      success: true,
      thought: newThought,
      thoughtCapsule: updatedCapsule,
    });
  } catch (error) {
    console.log("Error adding thoughts in server : ", error.message);
  }
};

module.exports.getThoughts = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const thoughtCapsule = await thoughtCapsuleModel
      .findOne({ userId })
      .populate("thoughts");

    if (!thoughtCapsule) {
      return res.status(404).json({ message: "No thoughts found" });
    }

    if (Date.now() < new Date(thoughtCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: thoughtCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Thoughts fetched successfully",
      success: true,
      thoughts: thoughtCapsule.thoughts,
    });
  } catch (error) {
    console.error("Error during fetch thoughts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
