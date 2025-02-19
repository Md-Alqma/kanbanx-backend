const List = require("../models/List");
const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, listId } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: "Title and listId are required" });
    }
    // Find list before creating a new task
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Create the task and associate it with the list
    const task = await Task.create({ title, description, status, dueDate, listId });
    list.tasks.push(task._id);
    await list.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Move a task between lists
exports.moveTask = async (req, res) => {
  try {
    const { listId } = req.body;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Find the original list and new list
    const [originalList, newList] = await Promise.all([
      List.findById(task.listId),
      List.findById(listId),
    ]);

    if (!originalList) return res.status(404).json({ message: "Original list not found" });
    if (!newList) return res.status(404).json({ message: "New list not found" });

    // Update task's listId and update lists
    await Promise.all([
      Task.findByIdAndUpdate(id, { listId }, { new: true }),
      List.findByIdAndUpdate(originalList._id, { $pull: { tasks: id } }),
      List.findByIdAndUpdate(newList._id, { $push: { tasks: id } }),
    ]);

    res.json({ message: "Task moved successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await List.findByIdAndUpdate(task.listId, { $pull: { tasks: id } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
