const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);

module.exports = router;
