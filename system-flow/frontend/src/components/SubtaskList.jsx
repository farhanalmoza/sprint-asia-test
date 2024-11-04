import React, { useState, useEffect } from 'react';
import { getSubtasks, createSubtask } from '../api';
import SubtaskItem from './SubtaskItem';

const SubtaskList = ({ taskId }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    const fetchSubtasks = async () => {
      const { data } = await getSubtasks(taskId);
      setSubtasks(data.data);
    };
    fetchSubtasks();
  }, [taskId]);

  const handleAddSubtask = async () => {
    const { data } = await createSubtask(taskId, { title: newSubtask });
    setSubtasks([...subtasks, data]);
    setNewSubtask("");
  };

  return (
    <div>
      <h4>Subtasks</h4>
      <input 
        type="text" 
        value={newSubtask} 
        onChange={(e) => setNewSubtask(e.target.value)} 
        placeholder="Add new subtask"
      />
      <button onClick={handleAddSubtask}>Add Subtask</button>
      <ul>
        {subtasks.map((subtask) => (
          <SubtaskItem key={subtask.id} subtask={subtask} taskId={taskId} />
        ))}
      </ul>
    </div>
  );
};

export default SubtaskList;
