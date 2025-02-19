const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  moveTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/:id", authMiddleware, getTask);
router.put("/:id", authMiddleware, updateTask);
router.put("/:id/move", authMiddleware, moveTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
