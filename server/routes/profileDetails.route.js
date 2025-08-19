const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  getCapsuleDetails,
  getUploadsLength,
} = require("../controllers/profileDetails.controller");

const router = express.Router();

router.route("/getCapsulesDetails").get(isAuthenticated, getCapsuleDetails);
router.route("/getUploadsLength").get(isAuthenticated, getUploadsLength);

module.exports = router;
