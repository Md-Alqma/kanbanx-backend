const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const taskSchema = new Schema(
  {
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Task", taskSchema);
