const express = require("express");
const {
  setAudioCapsule,
  addAudios,
  getAudios,
} = require("../controllers/audio.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/setAudioCapsule").post(isAuthenticated,setAudioCapsule);
router.route("/addAudio").post(isAuthenticated,addAudios);
router.route("/getAudios").get(isAuthenticated, getAudios);

module.exports = router;
