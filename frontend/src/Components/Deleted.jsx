import React, { useEffect, useState } from "react";
import NavSection from "./NavSection";
import api from "./AuthConfig/Api";

const Deleted = () => {
  const [deletedTask, setDeletedTask] = useState([]);

  console.log(deletedTask);

  useEffect(() => {
    async function getDeletedTask() {
      try {
        const token = JSON.parse(localStorage.getItem("tasktoken"));
        const response = await api.post("/deletedtask", { token });

        if (response.data.success) {
          setDeletedTask(response.data.deletedTask);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDeletedTask();
  }, []);
  return (
    <div>
      <NavSection />

      {deletedTask?.length ? (
        <div className="w-full mt-5 line-through">
          {deletedTask?.map((task) => (
            <div
              key={task._id}
              className="w-11/12 bg-red-700 font-bold text-lg tracking-widest rounded-2xl ml-auto mr-auto mt-2 p-5 text-white flex justify-around"
            >
              <div className="w-4/12">{task.title}</div>
              <div className="w-5/12">
                {task.description ? task.description : "No Description"}
              </div>
              <div className="w-1/12">{task.status}</div>
              <div className="w-1/12">{task.priority}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Deleted Tasks</div>
      )}
    </div>
  );
};

export default Deleted;
