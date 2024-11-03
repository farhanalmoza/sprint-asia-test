/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import AddModal from "../components/AddModal";
import { taskService } from "../services/task.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import toast from "react-hot-toast";

const Home = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState("all");
  
  const openModal = () => setIsAddModalOpen(true);
  const closeModal = () => setIsAddModalOpen(false);
  const saveTask = () => fetchTasks();

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

  const handleStatusUpdate = () => {
    fetchTasks();
  }

  return (
    <div className="container">
      <AddModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        onSave={saveTask}
      />

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTask}>
        <TabsList className="flex w-full grid-cols-4 text-center">
          <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          <TabsTrigger value="todo">To do ({getFilteredTasks("todo").length})</TabsTrigger>
          <TabsTrigger value="ongoing">On going ({getFilteredTasks("ongoing").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({getFilteredTasks("completed").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TaskList
            tasks={getFilteredTasks("all")}
            onEdit={openModal}
            onDelete={openModal}
            onDetail={openModal}
            onUpdateStatus={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="todo">
          <TaskList
            tasks={getFilteredTasks("todo")}
            onEdit={openModal}
            onDelete={openModal}
            onDetail={openModal}
            onUpdateStatus={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="ongoing">
          <TaskList
            tasks={getFilteredTasks("ongoing")}
            onEdit={openModal}
            onDelete={openModal}
            onDetail={openModal}
            onUpdateStatus={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="completed">
          <TaskList
            tasks={getFilteredTasks("completed")}
            onEdit={openModal}
            onDelete={openModal}
            onDetail={openModal}
            onUpdateStatus={handleStatusUpdate}
          />
        </TabsContent>
      </Tabs>



      {/* Add task button */}
      <div className="relative left-[300px] w-0">
        <button
          onClick={openModal}
          className="fixed bottom-4 bg-[#5f33e1] rounded-full w-10 h-10 text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
