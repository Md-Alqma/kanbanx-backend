const Task = require("../models/task");
const List = require("../models/list");

exports.create = async (req, res) => {
  const { listId } = req.body;
  try {
    const list = await List.findById(listId);
    const tasksCount = await Task.find({ list: listId }).countDocuments();
    const task = await Task.create({
      list: listId,
      position: tasksCount > 0 ? tasksCount : 0,
    });
    task._doc.list = list;
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { $set: req.body });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const { taskId } = req.params;
  try {
    const currentTask = await Task.findById(taskId);
    await Task.deleteOne({ _id: taskId });
    const tasks = await Task.find({ list: currentTask.list }).sort(
      "postition"
    );
    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key].id, { $set: { position: key } });
    }
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceListId,
    destinationListId,
  } = req.body;
  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    if (resourceListId !== destinationListId) {
      for (const key in resourceListReverse) {
        await Task.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: {
            list: resourceListId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: {
          list: destinationListId,
          position: key,
        },
      });
    }
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
