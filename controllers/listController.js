const Board = require("../models/Board");
const List = require("../models/List");
const mongoose = require("mongoose");

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    // Check if board exists
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Create the list and associate it with the board
    const list = await List.create({ title, boardId });
    board.lists.push(list._id); // Store only the list ID
    await board.save();

    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a list
exports.updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a list and remove it from the board
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    // Find list and ensure it exists
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Remove list reference from board
    await Board.findByIdAndUpdate(list.boardId, { $pull: { lists: id } });

    // Delete the list
    await List.findByIdAndDelete(id);

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
