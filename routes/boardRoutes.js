const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  getSingleBoard,
} = require("../controllers/boardController");

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/:id", authMiddleware, getSingleBoard);
router.get("/", authMiddleware, getBoards);
router.put("/:id", authMiddleware, updateBoard);
router.delete("/:id", authMiddleware, deleteBoard);

module.exports = router;
