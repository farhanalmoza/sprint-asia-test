import React, { useEffect, useState } from 'react'
import { subtaskService } from '../services/subtask.service';

export const SubtaskList = ({ subtasks, taskId }) => {
  const [subtaskList, setSubtaskList] = useState(subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubtasks();
  }, []);

  const fetchSubtasks = async () => {
    try {
      setIsLoading(true);
      const response = await subtaskService.getAllByTaskId(taskId);
      setSubtaskList(response.data);      
    } catch (error) {
      console.error("Error fetching subtasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add Subtask
  const addSubtask = async () => {
    if (!newSubtaskTitle) return;
    try {
      setIsLoading(true);
      const response = await subtaskService.createSubtask(taskId, { title: newSubtaskTitle });      
      setSubtaskList([...subtaskList, response.data]);
      setNewSubtaskTitle("");
    } catch (error) {
      console.error("Error adding subtask", error);
    } finally {
      setIsLoading(false);
    }
  }
  // End Add Subtask

  // Delete Subtask
  const deleteSubtask = async (subtaskId) => {
    try {
      setIsLoading(true);
      await subtaskService.deleteSubtask(taskId, subtaskId);
      setSubtaskList(subtaskList.filter((subtask) => subtask.id !== subtaskId));
    } catch (error) {
      console.error("Error deleting subtask", error);
    } finally {
      setIsLoading(false);
    }
  }
  // End Delete Subtask

  // Check/Uncheck Subtask
  const toggleSubtaskCompleted = async (subtaskId, isCompleted) => {
    try {
      setIsLoading(true);
      let status = subtaskList.find((subtask) => subtask.id === subtaskId).status;
      if (status === "completed") {
        status = "ongoing";
      } else {
        status = "completed";
      }
      await subtaskService.updateSubtask(taskId, subtaskId, { ...subtaskList.find((subtask) => subtask.id === subtaskId), status });
      setSubtaskList(subtaskList.map((subtask) => {
        if (subtask.id === subtaskId) {
          return { ...subtask, status, completed_at: isCompleted ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null };
        }
        return subtask;
      }));
    } catch (error) {
      console.error("Error updating subtask status", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='bg-[#f2f2f2] rounded-lg shadow-md p-2'>
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div> 
        </div>
      )}

      <ul className="grid gap-2">
        {subtaskList.map((subtask) => (
          <li
            key={subtask.id}
            className="items-center flex justify-between bg-white rounded-lg shadow-md p-2"
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={subtask.status === "completed"}
                onChange={() => toggleSubtaskCompleted(subtask.id, subtask.status === "completed")}
              />
              <span>{subtask.title}</span>
            </div>
            <button
              onClick={() => deleteSubtask(subtask.id)}
              className="rounded-lg text-[#e13333] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          placeholder="Add new subtask"
          className="px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={addSubtask}
          className='px-2 py-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-1 bg-[#5f33e1] text-white'
        >Add</button>
      </div>
    </div>
  )
}

export default SubtaskList