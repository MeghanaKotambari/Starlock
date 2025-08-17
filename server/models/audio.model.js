const { default: mongoose } = require("mongoose");

const AudioSchema = new mongoose.Schema(
  {
    audio: {
      type: String,
      required: true,
    },
    audioDescription: {
      type: String,
    },
    audioCapsule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudioCapsule",
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
module.exports = mongoose.model("Audios", AudioSchema);
