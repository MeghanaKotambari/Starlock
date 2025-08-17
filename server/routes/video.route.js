const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  setVideoCapsule,
  addVideos,
  getVideos,
} = require("../controllers/video.controller");

const router = express.Router();

router.route("/setVideoCapsule").post(isAuthenticated,setVideoCapsule);
router.route("/addVideo").post(isAuthenticated,addVideos);
router.route("/getVideos").get(isAuthenticated, getVideos);

module.exports = router;
