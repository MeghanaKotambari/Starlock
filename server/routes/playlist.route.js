const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { setPlaylistCapsule, addPlaylists, getPlaylists } = require("../controllers/playlist.controller");

const router = express.Router();

router.route("/setPlaylistCapsule").post(isAuthenticated,setPlaylistCapsule);
router.route("/addPlaylist").post(isAuthenticated,addPlaylists);
router.route("/getPlaylists").get(isAuthenticated, getPlaylists);

module.exports = router;
