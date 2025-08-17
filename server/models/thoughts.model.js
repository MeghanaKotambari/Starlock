const { default: mongoose } = require("mongoose");

const ThoughtSchema = new mongoose.Schema(
  {
    thoughtTitle: {
      type: String,
      required: true,
    },
    thoughtDescription: {
      type: String,
      required: true,
    },
    capsuleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ThoughtCapsule",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thoughts", ThoughtSchema);
