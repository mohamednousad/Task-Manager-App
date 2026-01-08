import React from 'react';

export default function TaskInput({ newTaskText, handleAddTask, setNewTaskText }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={newTaskText}

        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="Enter the Task"
        className="flex-1 rounded-xl border-2 border-neutral-700 bg-transparent px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
      />
      <button

        onClick={handleAddTask}
        className="bg-amber-500 text-neutral-950 rounded-xl sm:px-5 font-medium py-2 hover:bg-amber-400 transition-colors shrink-0"
      >
        Add
      </button>
    </div>
  );
}
