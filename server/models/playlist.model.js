const { default: mongoose } = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    playlist: {
      type: String,
      required: true,
    },
    playlistLink: {
      type: String,
    },
    playlistCapsule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaylistCapsule",
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
module.exports = mongoose.model("Playlists", PlaylistSchema);
