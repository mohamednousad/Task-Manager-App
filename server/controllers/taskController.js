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

    const task = await Task.create({ title });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
};


//update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    { title, completed },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
};


// Delete a task by ID
export const deleteTask = async (req, res) => {
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
};

// export { 
//     getTasks, 
//     createTask, 
//     deleteTask 
// };