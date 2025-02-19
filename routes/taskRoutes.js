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
router.get("/:taskId", authMiddleware, getTask);
router.put("/:taskId", authMiddleware, updateTask);
router.put("/:taskId/move", authMiddleware, moveTask);
router.delete("/:taskId", authMiddleware, deleteTask);

module.exports = router;
