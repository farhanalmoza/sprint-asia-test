import React, { useState } from 'react'

export const EditTaskForm = ({ task, onCancel, onSave}) => {
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline);
  const [status, setStatus] = useState(task.status);
  const [completed_at, setCompleted_at] = useState(task.completed_at);

  if (status === "completed") {
    setStatus("ongoing");
    setCompleted_at(null);
  }

  const handleSave = () => {
    onSave({ title, deadline, status, completed_at });
  }
  return (
    <div className="flex justify-center gap-2 my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        onClick={handleSave}
        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-1 bg-[#5f33e1] text-white"
      >Save</button>
      <button
        onClick={onCancel}
        className="px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-1 bg-[#e13333] text-white"
      >Cancel</button>
    </div>
  )
}

export default EditTaskForm
