const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  setPredictionCapsule,
  addPrediction,
  getPredictions,
} = require("../controllers/prediction.controller");

const router = express.Router();

router
  .route("/setPredictionCapsule")
  .post(isAuthenticated, setPredictionCapsule);
router.route("/addPrediction").post(isAuthenticated, addPrediction);
router.route("/getPredictions").get(isAuthenticated, getPredictions);

module.exports = router;
