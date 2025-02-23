const Board = require("../models/board");
const List = require("../models/list");
const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    const boardsCount = await Board.find().countDocuments();
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort("-position");
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId });
    if (!board) return res.status(404).json("Board not found");
    const lists = await List.find({ board: boardId });
    for (const list of lists) {
      const tasks = await Task.find({ list: list.id })
        .populate("list")
        .sort("-position");
      list._doc.tasks = tasks;
    }
    board._doc.lists = lists;
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;

  try {
    if (title === "") req.body.title = "Untitled";
    if (description === "") req.body.description = "Add description here";
    const currentBoard = await Board.findById(boardId);
    if (!currentBoard) return res.status(404).json("Board not found");

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort("favouritePosition");
      if (favourite) {
        req.body.favouritePosition =
          favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          const element = favourites[key];
          await Board.findByIdAndUpdate(element.id, {
            $set: { favouritePosition: key },
          });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, { $set: req.body });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Board.find({
      user: req.user._id,
      favourite: true,
    }).sort("-favouritePosition");
    res.status(200).json(favourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFavouritePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, {
        $set: { favouritePosition: key },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const { boardId } = req.params;
  try {
    const lists = await List.find({ board: boardId });
    for (const list of lists) {
      await Task.deleteMany({ list: list.id });
    }
    await List.deleteMany({ board: boardId });

    const currentBoard = await Board.findById(boardId);

    if (currentBoard.favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort("favouritePosition");

      for (const key in favourites) {
        const element = favourites[key];
        await Board.findByIdAndUpdate(element.id, {
          $set: { favouritePosition: key },
        });
      }
    }

    await Board.deleteOne({ _id: boardId });

    const boards = await Board.find().sort("position");
    for (const key in boards) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
    }

    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
