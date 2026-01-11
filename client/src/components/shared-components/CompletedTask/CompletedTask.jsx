import TaskItem from "../TaskItem/TaskItem";

export default function CompletedTask({ completedTasks, handleDeleteTask, handleToggleComplete }) {
  return (
    <div className="space-y-3 mt-4 pb-4">
      {completedTasks.map(task => (
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
