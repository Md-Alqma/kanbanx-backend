const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createList,
  updateList,
  deleteList,
  getSingleList,
  getLists,
} = require("../controllers/listController");

const router = express.Router();

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);
router.get("/:id", authMiddleware, getSingleList);
router.put("/:id", authMiddleware, updateList);
router.delete("/:id", authMiddleware, deleteList);

module.exports = router;
