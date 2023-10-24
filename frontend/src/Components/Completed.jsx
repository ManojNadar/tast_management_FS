import React, { useEffect, useState } from "react";
import NavSection from "./NavSection";
import api from "./AuthConfig/Api";

const Completed = () => {
  const [completedTask, setCompletedTask] = useState([]);
  console.log(completedTask);

  useEffect(() => {
    async function getCompletedTask() {
      try {
        const token = JSON.parse(localStorage.getItem("tasktoken"));
        const response = await api.post("/completedtask", { token });

        if (response.data.success) {
          setCompletedTask(response.data.completedTask);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCompletedTask();
  }, []);
  return (
    <div>
      <NavSection />

      {completedTask?.length ? (
        <div className="w-full mt-5 line-through">
          {completedTask?.map((task) => (
            <div
              key={task._id}
              className="w-11/12 bg-green-700 font-bold text-lg tracking-widest rounded-2xl ml-auto mr-auto mt-2 p-5 text-white flex justify-around"
            >
              <div className="w-4/12">{task.title}</div>
              <div className="w-5/12">
                {task.description ? (
                  <div>{task.description.slice(0, 20)}...</div>
                ) : (
                  "Empty Description"
                )}
              </div>
              <div className="w-1/12">{task.status}</div>
              <div className="w-1/12">{task.priority}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Completed Tasks</div>
      )}
    </div>
  );
};

export default Completed;
