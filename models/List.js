const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  }, // boardId for reference
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // List has multiple tasks
});

module.exports = mongoose.model('List', listSchema);
