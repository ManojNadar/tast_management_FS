import Task from "../Models/TaskModel.js";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const addTask = async (req, res) => {
  try {
    const { title, categories, description, dueDate, priority, status, token } =
      req.body;

    // console.log(title);

    if (!title) {
      return res.status(404).json({
        success: false,
        message: "Title is mandatory",
      });
    }

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    const newTask = new Task({
      title,
      description,
      categories,
      dueDate,
      priority,
      status,
      userId: user._id,
    });

    await newTask.save();
    const afterAddedTask = await Task.find({});
    return res.status(201).json({
      success: true,
      message: "new task added success",
      afterAddedTask: afterAddedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myTask = async (req, res) => {
  try {
    const { token } = req.body;

    // console.log(title, image, description, categories);

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const tasks = await Task.find({ userId });

    if (tasks) {
      return res.status(200).json({
        success: true,
        myTasks: tasks,
      });
    }

    return res.status(404).json({
      success: false,
      message: "no task Found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEditTask = async (req, res) => {
  try {
    const { id, token } = req.body;

    if (!token || !id)
      return res
        .status(404)
        .json({ success: false, message: "token and id is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const task = await Task.findOne({ _id: id, userId });

    if (task) {
      return res.status(200).json({
        success: true,
        getTask: task,
      });
    }

    return res.status(404).json({
      success: false,
      message: "no task found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body.getEditDetails;

    const { token, id } = req.body;

    console.log(title, description, priority, status, token, id);

    if (!token || !id)
      return res
        .status(404)
        .json({ success: false, message: "token and id is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    let flag = false;
    if (status == "Completed") {
      flag = true;
    } else {
      flag = false;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      {
        title,
        description,
        priority,
        status,
        categories,
        isCompletedTask: flag,
      },
      {
        new: true,
      }
    );

    if (task) {
      if (status == "Completed") {
        const afterComplete = await Task.findOneAndDelete({ _id: id, userId });

        if (afterComplete) {
          user.completedTask.push(afterComplete);
          await user.save();

          return res.status(200).json({
            success: true,
            afterComplete: afterComplete,
          });
        }
      }

      await task.save();
      return res.status(200).json({
        success: true,
        updatedTask: task,
      });
    }

    return res.status(404).json({
      success: false,
      message: "no task found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id, token } = req.body;

    if (!token || !id)
      return res
        .status(404)
        .json({ success: false, message: "token and id is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    const user = await User.findById(userId);

    if (task) {
      user.deletedTask.push(task);
      await user.save();

      const afterDeleteTask = await Task.find({});
      return res.status(200).json({
        success: true,
        message: "Task Deleted",
        afterDeleteTask: afterDeleteTask,
      });
    }

    return res.status(404).json({
      success: false,
      message: "no task found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
