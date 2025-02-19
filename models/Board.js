const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Contains the userId for reference
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }], // Board has multiple lists
});

module.exports = mongoose.model("Board", boardSchema);
