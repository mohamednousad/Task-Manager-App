import React from 'react';
import myImage from "../../../assets/Close-btn.png";

export default function TaskItem({ task, onDelete, onToggle }) {
  if (!task) return null; 

  return (
    <div
      onDoubleClick={onToggle}
      className={`w-full flex items-center justify-between rounded-xl px-4 py-3 sm:py-4 border border-neutral-800 hover:border-amber-500 transition-all cursor-pointer ${
        task.completed ? "opacity-70 bg-neutral-800" : "bg-neutral-900"
      }`}
    >
      <span
        className={`text-neutral-200 text-base sm:text-lg truncate ${
          task.completed ? "line-through" : ""
        }`}
      >
        {task.text || "No Title"}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="group w-9 h-9 rounded-full flex items-center justify-center shrink-0 hover:bg-red-500/10 transition-colors"
      >
        <img
          src={myImage}
          alt="delete"
          className="w-4 h-4 opacity-70 group-hover:opacity-100"
        />
      </button>
    </div>
  );
}
