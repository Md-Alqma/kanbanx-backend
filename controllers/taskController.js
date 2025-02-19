const List = require("../models/List");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { listId } = req.body;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const task = await Task.create({ ...req.body });
    list.tasks.push(task);
    await list.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {}
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.moveTask = async (req, res) => {
    try {
      const { listId } = req.body; // New list ID (where the task is moving)
      const id = req.params.id;
  
      // Find the task
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Find the original list (where the task currently exists)
      const originalList = await List.findById(task.listId);
      if (!originalList) {
        return res.status(404).json({ message: "Original list not found" });
      }
  
      // Find the new list (where the task is being moved)
      const newList = await List.findById(listId);
      if (!newList) {
        return res.status(404).json({ message: "New list not found" });
      }
  
      // Update the task's listId
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { listId: listId },
        { new: true }
      );
  
      // Remove the task from the original list
      await List.findByIdAndUpdate(originalList._id, {
        $pull: { tasks: id },
      });
  
      // Add the task to the new list
      await List.findByIdAndUpdate(listId, {
        $push: { tasks: id },
      });
  
      res.json({ message: "Task moved successfully", task: updatedTask });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    const listId = task.listId;

    await Task.findByIdAndDelete(id);
    await List.findByIdAndUpdate(listId, { $pull: { tasks: id } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
