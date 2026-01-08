import Task from "../models/Task.js";

// Get all tasks
export const getall = async (req, res) => {
  try {
    const tasks =  await Task.find().sort({ createdAt: -1 });
    if (tasks.length === 0) {
      return  res.status(404).json({
        status: false,
        message: "No tasks found",
        data: [],
      });
    }
    res.status(200).json({
      status: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(err);
        return res.status(500).json({
        status: false,
        message: err.message || "Internal Server Error",
    });
  }
};

// Create a new task
export const post = async (req, res) => {
  try {
    const data = req.body;
    if(
      data.title
    ) {
      const task = await Task.create(data);
      res.status(201).send({
        message: "Task created successfully",
        data: task
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "Title is required"
      });
    }
    
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(409).send({
        status: 409,
        message: "Task with this title already exists"
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "Server Error"
      });
    }
  }
};

//update task
export const put = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if(
      data?.title
    ){
      const { ...dataToUpdate } = data;

      const updatedTask = await Task.findByIdAndUpdate(
        {_id: id},
        dataToUpdate,
        { new: true, runValidators: true }
      );

      return res.status(200).send({
        status: 200,
        message: "Task updated successfully",
        data: updatedTask
      });
    }
    else {
      res.status(400).send({
        status: 400,
        message: "Title is required"
      });
    }
} catch (err) {
    console.error(err, 'err');

    if (err.code === 11000) { 
        res.status(409).send({
            status: 409,
            message: `Origin already exists.`,
        });
    } else {
        res.status(500).send({
            status: 500,
            message: `Internal server error.`,
        });
    }
  }
}


// Delete a task
export const del = async (req, res) => {

  try {
    const id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete ({_id: id});

    if (deleteTask) {
      res.status(200).send({
        status: 200,
        message: "Task deleted successfully",
        data: deleteTask
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "Task delete failed",
        error: "Task not found"
      });
      throw new Error("Task not found");
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Server Error"
      });
    }
};