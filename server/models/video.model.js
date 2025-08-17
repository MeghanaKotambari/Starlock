const { default: mongoose } = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    video: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
    },
    videoCapsule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoCapsule",
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
module.exports = mongoose.model("Videos", VideoSchema);
