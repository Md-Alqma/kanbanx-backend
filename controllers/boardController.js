const Board = require("../models/Board");
const User = require("../models/User");

exports.createBoard = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const board = await Board.create({
      title: req.body.title,
      userId: req.user.userId,
    });
    user.boards.push(board);
    await user.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSingleBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id).populate("lists");
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const boards = await Board.find({ userId }).populate("lists");
    res.json(boards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
