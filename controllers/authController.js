const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

// Reusable function to send standardized responses
const sendResponse = (res, user, message) => {
  const token = generateToken(user._id);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({
      message,
      email: user.email ,
      token,
    });
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password securely before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Send response with token
    sendResponse(res, user, "User registered successfully");
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send response with token
    sendResponse(res, user, "Logged in successfully");
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Get authenticated user details
exports.getUser = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Fetch user details, excluding password
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
