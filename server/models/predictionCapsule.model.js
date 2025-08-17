const mongoose = require("mongoose");

const predictionCapsuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  predictions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prediction",
    },
  ],
  timeToUnlock: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PredictionCapsule", predictionCapsuleSchema);
