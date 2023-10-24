import React, { useContext, useEffect, useState } from "react";
import NavSection from "./NavSection";
import { Input, Button, Textarea, Radio, RadioGroup } from "@nextui-org/react";
import api from "./AuthConfig/Api";
import { toast } from "react-toastify";
import { MyContext } from "./Context/TaskContext";

const Home = () => {
  const [title, setTitle] = useState("");
  const [myTask, setMyTask] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [getEditDetails, setGetEditDetails] = useState({
    dueDate: "",
  });
  // console.log(title);
  // console.log(myTask);
  console.log(getEditDetails);
  const { state } = useContext(MyContext);

  const assignTask = async () => {
    try {
      if (title) {
        const token = JSON.parse(localStorage.getItem("tasktoken"));
        const response = await api.post("/addtask", { title, token });
        if (response.data.success) {
          toast.success(response.data.message);
          setMyTask(response.data.afterAddedTask);
          setTitle("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    async function mytask() {
      try {
        const token = JSON.parse(localStorage.getItem("tasktoken"));
        const response = await api.post("/mytask", { token });
        if (response.data.success) {
          setMyTask(response.data.myTasks);
        } else {
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    mytask();
  }, []);

  const getEditTask = async (id) => {
    // console.log(id);
    setEditModal(true);

    try {
      const token = JSON.parse(localStorage.getItem("tasktoken"));
      const response = await api.post("/getedittask", { id, token });

      if (response.data.success) {
        setGetEditDetails(response.data.getTask);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleEditChange = (e) => {
    const { value, name } = e.target;
    setGetEditDetails({ ...getEditDetails, [name]: value });
  };

  const updateTask = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("tasktoken"));
      const response = await api.post("/updateTask", {
        token,
        id,
        getEditDetails,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditModal(false);
        setGetEditDetails({});
        setMyTask(response.data.updatedTask);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("tasktoken"));
      const response = await api.post("/deleteTask", {
        token,
        id,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setMyTask(response.data.afterDeleteTask);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {editModal ? (
        <div className="w-full h-screen fixed top-0 left-0 bg-transparent z-50 flex justify-center items-center">
          <div className="w-7/12 h-unit-8xl bg-slate-500 relative">
            <div
              className="absolute right-5 top-2 font-extrabold"
              onClick={() => setEditModal(false)}
            >
              X
            </div>
            <div>
              <Input
                onChange={handleEditChange}
                value={getEditDetails.title}
                isDisabled
                name="title"
              />
              <Textarea
                onChange={handleEditChange}
                placeholder="Enter Description"
                value={getEditDetails.description}
                name="description"
              />
              <Input
                type="date"
                value={getEditDetails.dueDate}
                onChange={handleEditChange}
                name="dueDate"
              />

              <RadioGroup
                onChange={handleEditChange}
                label="Priority"
                color="primary"
                value={getEditDetails.priority}
                name="priority"
              >
                <div className="flex">
                  <Radio value="High">High</Radio>
                  <Radio value="Medium">Medium</Radio>
                  <Radio value="Low">Low</Radio>
                </div>
              </RadioGroup>
              <RadioGroup
                name="status"
                value={getEditDetails.status}
                label="Status"
                color="primary"
                onChange={handleEditChange}
              >
                <div className="flex">
                  <Radio value="New">New</Radio>
                  <Radio value="Progress">Progress</Radio>
                  <Radio value="Completed">Completed</Radio>
                </div>
              </RadioGroup>

              <Button
                color="warning"
                onClick={() => updateTask(getEditDetails._id)}
              >
                Update Task
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      <NavSection />

      {state?.currentuser ? (
        <div>
          <div className="flex w-6/12 justify-around mt-4 ml-auto mr-auto">
            <Input
              type="email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Task"
              className="w-8/12 outline-1 outline-primary-50"
            />

            <Button color="success" className="w-2/12" onClick={assignTask}>
              Assign Task
            </Button>
          </div>

          {myTask?.length ? (
            <div className="w-11/12 flex justify-between mt-2 ml-auto mr-auto text-xl font-extrabold">
              <div className="w-5/12">Title Name</div>
              <div className="w-7/12 flex justify-around">
                <div>DueDate</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
          ) : null}

          <div className="w-11/12 mt-10 ml-auto mr-auto">
            {myTask?.length ? (
              <div>
                {myTask?.map((task) => (
                  <div
                    key={task._id}
                    className="w-full flex justify-between bg-slate-500 mt-2 p-5"
                  >
                    <div className="w-5/12">{task.title}</div>
                    <div className="w-7/12 flex justify-around">
                      <div>{task.dueDate}</div>
                      <div>{task.priority}</div>
                      <div>{task.status}</div>
                      <Button
                        color="secondary"
                        onClick={() => getEditTask(task._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteTask(task._id)}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">No Task</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl font-extrabold mt-5">
          Please Login To See the Task
        </div>
      )}
    </>
  );
};

export default Home;
