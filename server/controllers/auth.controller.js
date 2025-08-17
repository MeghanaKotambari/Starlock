const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await authModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await authModel.create({
      username,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({ message: "Failed to create user" });
    }

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error during the register in server : ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);
    res.cookie("token", token);

    return res.status(200).json({
      message: "User Login Successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error during the login in server : ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User Logout Successfully", success: true });
  } catch (error) {
    console.log("Error during the logout in server : ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
