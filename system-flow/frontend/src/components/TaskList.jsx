import React from "react";
import CircularProgress from "./CircularProgress";
import { taskService } from "../services/task.service";
import toast from "react-hot-toast";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const optionsDate = { day: 'numeric', month: 'short', year: '2-digit' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};

const calculatePercentage = (status, subtasks) => {
  let completedSubtasks = 0;
  if (status === "completed") return 100;
  if (subtasks.length === 0) return 0;
  subtasks.forEach((subtask) => {
    if (subtask.status === "completed") {
      completedSubtasks++;
    }
  });

  return (completedSubtasks / subtasks.length) * 100;
};

const TaskList = ({ tasks, onDelete, onCheckTask, onEdit }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="bg-white w-full px-4 py-2 rounded-2xl shadow-md flex justify-between">
          <div className="flex gap-2">
            <input
              type="checkbox"
              onChange={() => onCheckTask(task.id)}
              className="w-4" defaultChecked={task.status === "completed"}
            />
            <div className="">
              <h1>{task.title}</h1>
              <div className="text-[#6e6a7c] text-xs mt-2">
                {formatDate(task.deadline)}
              </div>
            </div>
          </div>

          <div className="flex">
            {/* percentage cirecle line */}
            <CircularProgress
              percentage={tasks.status === "completed" ? 100 : calculatePercentage(task.status, task.subtasks)}
            />
            <div className="grid">
              {/* edit & delete buttons using icons */}
              {task.status !== "completed" && (
                <button
                  onClick={() => onEdit(task)}
                  className="rounded-lg text-[#3194f0] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg text-[#e13333] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;