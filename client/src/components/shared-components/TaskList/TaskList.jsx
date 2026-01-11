import React from 'react';
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ pendingTasks, handleDeleteTask, handleToggleComplete }) {
  return (
    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto mb-6">
      {pendingTasks.map(task => (
        <TaskItem
          key={task._id} 
          task={task}
          onDelete={() => handleDeleteTask(task._id)}
          onToggle={() => handleToggleComplete(task._id)}
        />
      ))}
    </div>
  );
}
