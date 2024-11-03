/* eslint-disable react/prop-types */
import { useState } from "react";
import CircularProgress from "../components/CircularProgress";
import AddModal from "../components/AddModal";

const Home = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const openModal = () => setIsAddModalOpen(true);
  const closeModal = () => setIsAddModalOpen(false);

  return (
    <div className="container">
      <AddModal isOpen={isAddModalOpen} onClose={closeModal}  />

      <div className="flex mb-4 gap-2">
        <button
          className="bg-[#5f33e1] rounded-lg text-white px-4 py-1 text-xs shadow-lg font-medium"
        >To do</button>
        <button
          className="bg-[#ede8ff] rounded-lg text-[#5f33e1] px-4 py-1 text-xs shadow-md font-medium"
        >On going</button>
        <button
          className="bg-[#ede8ff] rounded-lg text-[#5f33e1] px-4 py-1 text-xs shadow-md font-medium"
        >Completed</button>
      </div>

      <div className="">
        <div className="bg-white w-full px-4 py-2 rounded-2xl shadow-md flex justify-between">
          <div className="flex gap-2">
            <input type="checkbox" className="w-4" />
            <div className="">
              <h1>Task 1</h1>
              <div className="text-[#6e6a7c] text-xs mt-2">2024-01-01 00:00:00</div>
            </div>
          </div>

          {/* percentage cirecle line */}
          <CircularProgress
            percentage={50}
          />
        </div>
      </div>

      {/* Add task button */}
      <div className="h-screen relative left-[300px] w-0">
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
