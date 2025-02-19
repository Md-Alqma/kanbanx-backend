const Board = require("../models/Board");
const List = require("../models/List");

exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const list = await List.create({
      title: req.body.title,
      boardId: req.body.boardId,
    });
    board.lists.push(list._id);
    await board.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const boardId = list.boardId;

    console.log(boardId);

    await List.findByIdAndDelete(id);
    await Board.findByIdAndUpdate(boardId, { $pull: { lists: id } });
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
