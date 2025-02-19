const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      userId: req.user.userId,
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.userId }).populate(
      "lists"
    );
    res.json(boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
