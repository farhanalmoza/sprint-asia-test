import React, { useState } from 'react';
import { updateSubtask, deleteSubtask } from '../api';

const SubtaskItem = ({ subtask, taskId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(subtask.title);

  const handleComplete = async () => {
    await updateSubtask(taskId, subtask.id, { ...subtask, completed: !subtask.completed });
  };

  const handleDelete = async () => {
    await deleteSubtask(taskId, subtask.id);
  };

  const handleEdit = async () => {
    await updateSubtask(taskId, subtask.id, { ...subtask, title });
    setIsEditing(false);
  };

  return (
    <li>
      <input type="checkbox" checked={subtask.completed} onChange={handleComplete} />
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleEdit}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{subtask.title}</span>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default SubtaskItem;
