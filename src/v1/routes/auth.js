const router = require("express").Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const User = require("../models/user");

router.post(
  "/signup",
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        return Promise.reject("Username is already taken");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        return Promise.reject("Email is already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be at least 8 characters"),
  validation.validate,
  userController.register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validation.validate,
  userController.login
);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
