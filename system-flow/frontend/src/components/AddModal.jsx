import React, { useState } from "react";
import { taskService } from "../services/task.service";
import toast from "react-hot-toast";

function AddModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;
  
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    deadline: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await taskService.createTask(inputs);
      resetForm();
      toast.success("Task added successfully")
      onSave();
      onClose();
    } catch (error) {
      console.log("Error saving task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInputs({
      title: "",
      description: "",
      deadline: "",
    })
  }

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 max-w-96 mx-auto">
      <div className="bg-white w-4/5 mx-auto rounded-2xl shadow-md p-4 mt-10">

        {isLoading && (
          <div
            className="flex justify-center items-center fixed z-50 bg-black bg-opacity-50 top-0 bottom-0 left-0 right-0 max-w-96 mx-auto">
            <div className="text-white">Loading...</div>
          </div>
        )}
        {/* close button */}
        <div className="flex w-full justify-end">
          <button
            onClick={onClose}
            className="top-4 text-[#5f33e1]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="gap-1 grid">
              <label htmlFor="task-name" className="text-xs text-[#6e6a7c]">Task name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Task name"
                value={inputs.title}
                onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                className="rounded-lg px-3 py-2 bg-slate-100 focus:outline-none text-sm"
              />
            </div>
            <div className="gap-1 grid">
              <label htmlFor="task-name" className="text-xs text-[#6e6a7c]">Description</label>
              <textarea
                rows="3"
                placeholder="Task description"
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                className="rounded-lg px-2 py-1 bg-slate-100 focus:outline-none text-sm"
              ></textarea>
            </div>
            <div className="gap-1 grid">
              <label htmlFor="task-name" className="text-xs text-[#6e6a7c]">Due date <span className="text-red-500">*</span></label>
              <input
                type="datetime-local"
                placeholder="Due date"
                value={inputs.deadline}
                onChange={(e) => setInputs({ ...inputs, deadline: e.target.value })}
                className="rounded-lg px-3 py-2 bg-slate-100 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#5f33e1] rounded-lg text-white px-6 py-2 shadow-lg font-medium"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal;