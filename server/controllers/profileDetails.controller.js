const audioCapsuleModel = require("../models/audioCapsule.model");
const imageCapsuleModel = require("../models/imageCapsule.model");
const videoCapsuleModel = require("../models/videoCapsule.model");
const thoughtCapsuleModel = require("../models/thoughtCapsule.model");
const predictionCapsuleModel = require("../models/predictionCapsule.model");
const playlistCapsuleModel = require("../models/playlistCapsule.model");

module.exports.getCapsuleDetails = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "Unauthorized" });
    }

    const image = await imageCapsuleModel.findOne({ userId });
    const audio = await audioCapsuleModel.findOne({ userId });
    const video = await videoCapsuleModel.findOne({ userId });
    const thought = await thoughtCapsuleModel.findOne({ userId });
    const prediction = await predictionCapsuleModel.findOne({ userId });
    const playlist = await playlistCapsuleModel.findOne({ userId });

    if (!image || !audio || !video || !thought || !prediction || !playlist) {
      console.log(image, audio, video, thought, prediction, playlist);
      return res
        .status(404)
        .json({ message: "All the capsulas must be set", success: false });
    }

    return res
      .status(200)
      .json({ message: "All Capsules Already Set", success: true });
  } catch (error) {
    console.log("Error while fetching capsules data : ", error.message);
  }
};

module.exports.getUploadsLength = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "Unauthorized" });
    }

    const image = await imageCapsuleModel.findOne({ userId });
    const audio = await audioCapsuleModel.findOne({ userId });
    const video = await videoCapsuleModel.findOne({ userId });
    const thought = await thoughtCapsuleModel.findOne({ userId });
    const prediction = await predictionCapsuleModel.findOne({ userId });
    const playlist = await playlistCapsuleModel.findOne({ userId });

    const data = {
      imagesCount: image?.images?.length || 0,
      imageUnlockTime: image?.timeToUnlock,
      audiosCount: audio?.audios?.length || 0,
      audioUnlockTime: audio?.timeToUnlock,
      videosCount: video?.videos?.length || 0,
      videoUnlockTime: video?.timeToUnlock,
      thoughtsCount: thought?.thoughts?.length || 0,
      thoughtUnlockTime: thought?.timeToUnlock,
      predictionsCount: prediction?.predictions?.length || 0,
      predictionUnlockTime: prediction?.timeToUnlock,
      playlistsCount: playlist?.playlists?.length || 0,
      playlistUnlockTime: playlist?.timeToUnlock,
    };

    return res.status(200).json({ success: true, counts: data });
  } catch (error) {
    console.log("Error Getting Uploads data : ", error.message);
  }
};
