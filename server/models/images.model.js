const { default: mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imageDescription: {
      type: String,
    },
    imageCapsule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageCapsule",
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
module.exports = mongoose.model("Images", ImageSchema);
