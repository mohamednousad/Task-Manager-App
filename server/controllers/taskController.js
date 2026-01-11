import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server Error"
    });
  }
};

// Create a new task
export const createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    try {
      const task = await Task.create({ title });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: "Server Error"
      });
    }
};


// Update a task
// controllers/taskController.js
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body; // get only what frontend sends

    // Make sure task exists
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    // Update fields only if they exist
    if (completed !== undefined) task.completed = completed;
    if (title !== undefined) task.title = title;

    const updatedTask = await task.save(); // save to DB

    res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Delete a task by ID
export const deleteTask = async (req, res) => {

  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    await task.deleteOne();
    res.status(200).json({ 
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server Error"
    });
  }
};