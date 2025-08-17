const playlistModel = require("../models/playlist.model");
const playlistCapsuleModel = require("../models/playlistCapsule.model");

module.exports.setPlaylistCapsule = async (req, res) => {
  try {
    const { timeToUnlock } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!timeToUnlock) {
      return res.status(400).json({ message: "Time to unlock is required" });
    }

    const existingCapsule = await playlistCapsuleModel.findOne({ userId });

    if (existingCapsule) {
      return res
        .status(400)
        .json({ message: "Playlist Capsule already exists for this user" });
    }

    const newPlaylistCapsule = await playlistCapsuleModel.create({
      userId,
      timeToUnlock,
      playlists: [],
    });

    return res.status(201).json({
      message: "Playlist Capsule created successfully",
      success: true,
      capsule: newPlaylistCapsule,
    });
  } catch (error) {
    console.log("Error during setPlaylistCapsule: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addPlaylists = async (req, res) => {
  try {
    const { playlist, playlistLink } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!playlist || !playlistLink) {
      return res
        .status(400)
        .json({ message: "Playlist name and Playlist link are required" });
    }

    const newPlaylist = await playlistModel.create({
      playlist,
      playlistLink,
    });

    const updatedCapsule = await playlistCapsuleModel.findOneAndUpdate(
      { userId },
      { $push: { playlists: newPlaylist._id } },
      { new: true }
    );

    if (!updatedCapsule) {
      return res
        .status(400)
        .json({ message: "No playlist capsule found for this user" });
    }

    return res.status(201).json({
      message: "Playlist added successfully to capsule",
      success: true,
      playlist: newPlaylist,
      capsule: updatedCapsule,
    });
  } catch (error) {
    console.log("Error during addPlaylists: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getPlaylists = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const playlistCapsule = await playlistCapsuleModel
      .findOne({ userId })
      .populate("playlists");

    if (!playlistCapsule) {
      return res.status(404).json({ message: "No playlist capsule found" });
    }

    if (Date.now() < new Date(playlistCapsule.timeToUnlock).getTime()) {
      return res.status(403).json({
        message: "Capsule is locked",
        unlocksAt: playlistCapsule.timeToUnlock,
      });
    }

    return res.status(200).json({
      message: "Playlists fetched successfully",
      success: true,
      playlists: playlistCapsule.playlists,
    });
  } catch (error) {
    console.log("Error during getPlaylists:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
