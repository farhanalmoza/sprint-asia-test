/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { taskService } from "../services/task.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import toast from "react-hot-toast";
import EditTaskForm from "../components/EditTaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getFilteredTasks = (status) => {
    if (status === "all") return tasks;
    return tasks.filter((task) => task.status === status);
  }

  // Add Task
  const [addTaskInputs, setAddTaskInputs] = useState({
    title: "",
    deadline: "",
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await taskService.createTask(addTaskInputs);
      fetchTasks();
      setAddTaskInputs({
        title: "",
        deadline: "",
      });
      setIsLoading(false);
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };
  // End Add Task

  // Check/Uncheck Task
  const handleCheckTask = async (taskId) => {
    try {
      setIsLoading(true);
      let status = tasks.find((task) => task.id === taskId).status;
      let completed_at = null;
      if (status === "completed") {
        status = "ongoing";
      } else {
        status = "completed";
        completed_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
      }
      await taskService.updateTask(taskId, { ...tasks.find((task) => task.id === taskId), status, completed_at });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status", error);
    } finally {
      setIsLoading(false);
    }
  }
  // End Check/Uncheck Task

  // Update Task
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      setIsLoading(true);
      await taskService.updateTask(taskId, { ...tasks.find((task) => task.id === taskId), ...updatedData });
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task", error);
    } finally {
      setIsLoading(false);
      toast.success("Task updated successfully");
    }
  }
  // End Update Task

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      setIsLoading(true);
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task", error);
    } finally {
      setIsLoading(false);
    }
  }
  // End Delete Task

  return (
    <div className="container">
      {isLoading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div> 
        </div>
      )}

      <form onSubmit={handleAddTask} className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Task title"
          onChange={(e) => setAddTaskInputs({ ...addTaskInputs, title: e.target.value })}
          value={addTaskInputs.title}
          required />
        <input
          type="datetime-local"
          onChange={(e) => setAddTaskInputs({ ...addTaskInputs, deadline: e.target.value })}
          required />
        <button type="submit">Add Task</button>
      </form>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTask}>
        <TabsList className="flex w-full grid-cols-4 text-center">
          <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          <TabsTrigger value="todo">To do ({getFilteredTasks("todo").length})</TabsTrigger>
          <TabsTrigger value="ongoing">On going ({getFilteredTasks("ongoing").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({getFilteredTasks("completed").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {editingTask && (
            <EditTaskForm
              task={editingTask}
              onCancel={() => setEditingTask(null)}
              onSave={(updatedData) => handleUpdateTask(editingTask.id, updatedData)}
            />
          )}

          <TaskList
            tasks={getFilteredTasks("all")}
            onDelete={handleDeleteTask}
            onCheckTask={handleCheckTask}
            onEdit={handleEditTask}
            onUpdate={handleUpdateTask}
          />
        </TabsContent>

        <TabsContent value="todo">
          <TaskList
            tasks={getFilteredTasks("todo")}
            onDelete={handleDeleteTask}
            onCheckTask={handleCheckTask}
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <TaskList
            tasks={getFilteredTasks("ongoing")}
            onDelete={handleDeleteTask}
            onCheckTask={handleCheckTask}
          />
        </TabsContent>

        <TabsContent value="completed">
          <TaskList
            tasks={getFilteredTasks("completed")}
            onDelete={handleDeleteTask}
            onCheckTask={handleCheckTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
