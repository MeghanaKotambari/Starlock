const predictionModel = require("../models/prediction.model");
const predictionCapsuleModel = require("../models/predictionCapsule.model");

module.exports.setPredictionCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await predictionCapsuleModel.findOne({ userId });

    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Prediction Capsule already exists for this user" });
    }

    const newPredictionCapsule = await predictionCapsuleModel.create({
      userId,
      timeToUnlock,
      predictions: [],
    });

    return res.status(201).json({
      message: "Prediction Capsule created successfully",
      success: true,
      capsule: newPredictionCapsule,
    });
  } catch (error) {
    console.log("Error during setPredictionCapsule:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addPrediction = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Question and Answer are required" });
    }

    const newPrediction = await predictionModel.create({
      question,
      answer,
    });

    const updatedCapsule = await predictionCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { predictions: newPrediction._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "No prediction capsule found for this user" });
    }

    return res.status(201).json({
      message: "Prediction added successfully to capsule",
      success: true,
      prediction: newPrediction,
      capsule: updatedCapsule,
    });
  } catch (error) {
    console.log("Error during addPrediction:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getPredictions = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const predictionCapsule = await predictionCapsuleModel
      .findOne({ userId })
      .populate("predictions");

    if (!predictionCapsule) {
      return res.status(404).json({ message: "No prediction capsule found" });
    }

    if (Date.now() < new Date(predictionCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: predictionCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Predictions fetched successfully",
      success: true,
      predictions: predictionCapsule.predictions,
    });
  } catch (error) {
    console.log("Error during getPredictions:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
