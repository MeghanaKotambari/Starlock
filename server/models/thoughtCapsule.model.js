const { default: mongoose, mongo } = require("mongoose");

const ThoughtCapsule = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thoughts",
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

module.exports = mongoose.model("ThoughtCapsule", ThoughtCapsule);
