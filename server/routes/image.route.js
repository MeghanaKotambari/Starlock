const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { setImageCapsule, addImages, getImages } = require("../controllers/images.controller");

const router = express.Router();

router.route("/setImageCapsule").post(isAuthenticated,setImageCapsule);
router.route("/addImage").post(isAuthenticated,addImages);
router.route("/getImages").get(isAuthenticated, getImages);

module.exports = router;
