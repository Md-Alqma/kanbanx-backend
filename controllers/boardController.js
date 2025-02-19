const Board = require("../models/Board");
const User = require("../models/User");

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title } = req.body;

    // Find user before creating a board
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the board and associate it with the user
    const board = await Board.create({ title, userId });
    user.boards.push(board._id); // Store only the board ID
    await user.save();

    res.status(201).json({ message: "Board created successfully", board });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Get a single board with its lists
exports.getSingleBoard = async (req, res) => {
  try {
    const { id } = req.params;

    // Populate lists
    const board = await Board.findById(id).populate("lists");

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Get all boards for a user
exports.getBoards = async (req, res) => {
  try {
    const { userId } = req.user;

    // Ensure user exists before fetching boards
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch boards
    const boards = await Board.find({ userId }).populate("lists");
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Update a board
exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBoard = await Board.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board updated successfully", updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Delete a board and remove it from the user
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the board
    const board = await Board.findByIdAndDelete(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Remove board reference from user's boards array
    await User.findByIdAndUpdate(board.userId, { $pull: { boards: id } });

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
