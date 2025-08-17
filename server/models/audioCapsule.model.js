const { default: mongoose, mongo } = require("mongoose");

const AudioCapsule = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    audios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Audios",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AudiosCapsule", AudioCapsule);
