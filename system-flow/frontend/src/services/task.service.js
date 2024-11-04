import axios from "axios"

const API_URL = "http://localhost:8000/api/tasks"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskService = {
  // get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get("");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  // create a new task
  createTask: async (task) => {
    try {
      const { success, data, message } = await api.post("/", task);
      if (success) {
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  },

  // update a task
  updateTask: async (taskId,task) => {
    try {
      const { success, data, message } = await api.put("/"+taskId, task);
      if (success) {
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  },

  // delete a task
  deleteTask: async (taskId) => {
    try {
      const { success, data, message } = await api.delete("/"+taskId);
      if (success) {
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  },
}