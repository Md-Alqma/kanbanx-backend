const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }], // A User has multiple boards
});

module.exports = mongoose.model("User", userSchema);
