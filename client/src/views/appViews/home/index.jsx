import React, { useState, useEffect } from 'react';
import MainLayout from "../../../layouts/MainLayout";
import Header from "../../../components/shared-components/Header/Header";
import TaskList from "../../../components/shared-components/TaskList/TaskList";
import TaskInput from "../../../components/shared-components/TaskInput/TaskInput";
import CompletedTask from "../../../components/shared-components/CompletedTask/CompletedTask";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  const API_URL = "http://localhost:5000/api/task";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const mappedTasks = data.map(task => ({
          _id: task._id,
          text: task.title,
          completed: task.completed
        }));
        setTasks(mappedTasks);
      })
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);


  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      const res = await fetch(`${API_URL}/creatTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskText })
      });

      const response = await res.json();

      if (!response.data) throw new Error("No task returned from backend");

      const newTask = {
        _id: response.data._id,
        text: response.data.title,
        completed: response.data.completed
      };

      setTasks(prev => [newTask, ...prev]);
      setNewTaskText("");

    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };


const handleToggleComplete = async (id) => {

  setTasks(prev =>
    prev.map(t =>
      t._id === id ? { ...t, completed: !t.completed } : t
    )
  );

  const nextCompleted = tasks.find(t => t._id === id)?.completed;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !nextCompleted }) 
    });
  } catch (err) {
    console.error("Error updating task:", err);


    setTasks(prev =>
      prev.map(t =>
        t._id === id ? { ...t, completed: nextCompleted } : t
      )
    );
  }
};
  const pendingTasks = tasks.filter(t => t && !t.completed);
  const completedTasks = tasks.filter(t => t && t.completed);

  return (
    <MainLayout>
      <Header />

      <TaskList
        pendingTasks={pendingTasks}
        handleDeleteTask={handleDeleteTask}
        handleToggleComplete={handleToggleComplete}
      />

      <TaskInput
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        handleAddTask={handleAddTask}
      />

      <CompletedTask
        completedTasks={completedTasks}
        handleDeleteTask={handleDeleteTask}
        handleToggleComplete={handleToggleComplete}
      />
    </MainLayout>
  );
}
