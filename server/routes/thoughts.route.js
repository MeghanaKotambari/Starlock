const express = require("express");

const isAuthenticated = require("../middleware/isAuthenticated");
const {
  setThoughtCapsule,
  addThoughts,
  getThoughts,
} = require("../controllers/thoughts.controller");

const router = express.Router();

router.route("/setThoughtCapsule").post(isAuthenticated, setThoughtCapsule);
router.route("/addThoughts").post(isAuthenticated, addThoughts);
router.route("/getThoughts").get(isAuthenticated, getThoughts);

module.exports = router;
