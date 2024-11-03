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
      const { response } = await api.get("/");
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
}