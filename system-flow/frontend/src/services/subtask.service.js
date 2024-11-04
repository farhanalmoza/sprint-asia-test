import axios from "axios"

const API_URL = "http://localhost:8000/api"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const subtaskService = {
    // get all subtasks
    getAllByTaskId: async (taskId) => {
        try {
            const { data } = await api.get(`/tasks/${taskId}/subtasks`);
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    // create a new subtask
    createSubtask: async (taskId, subtask) => {
        try {
            const { data } = await api.post(`/tasks/${taskId}/subtasks`, subtask);
            if (data.success) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    },

    // update a subtask
    updateSubtask: async (taskId, subtaskId, subtask) => {
        try {
            const { success, data, message } = await api.put(`/tasks/${taskId}/subtasks/${subtaskId}`, subtask);
            if (success) {
                return message;
            }
        } catch (error) {
            console.log(error);
        }
    },

    // delete a subtask
    deleteSubtask: async (taskId, subtaskId) => {
        try {
            const { success, data, message } = await api.delete(`/tasks/${taskId}/subtasks/${subtaskId}`);
            if (success) {
                return message;
            }
        } catch (error) {
            console.log(error);
        }
    },
}