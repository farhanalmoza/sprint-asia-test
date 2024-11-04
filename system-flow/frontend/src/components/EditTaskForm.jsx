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
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default EditTaskForm
