const List = require("../models/list");
const Task = require("../models/task");

exports.create = async (req, res) => {
  const { boardId } = req.params;
  try {
    const list = await List.create({ board: boardId });
    list._doc.tasks = [];
    res.status(201).json(list);
  } catch (err) {
    res.status(500).josn(err);
  }
};

exports.update = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findByIdAndUpdate(listId, {
      $set: req.body,
    });
    list._doc.tasks = [];
    res.status(200).json(list);
  } catch (err) {
    res.status(500).josn(err);
  }
};

exports.delete = async (req, res) => {
  const { listId } = req.params;
  try {
    await Task.deleteMany({ list: listId });
    await List.deleteOne({ _id: listId });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).josn(err);
  }
};
