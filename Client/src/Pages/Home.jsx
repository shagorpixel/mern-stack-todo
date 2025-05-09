import { useEffect, useState } from "react";
import Form from "./Components/Form";
import axios from "axios";
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import TaskStatus from "./Components/TaskStatus";

const Home = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [addedMessage, setAddedMessage] = useState("");

  const [formStatus, setFormStatus] = useState({
    status: "Add",
    id: null,
  });

  
  
  useEffect(() => {
    if (addedMessage) {
      setTimeout(() => {
        setAddedMessage("");
      }, 2000);
    }
  }, [addedMessage]);

  useEffect(() => {
    const query =
      selectedStatus == "Pending"
        ? "completed=false"
        : selectedStatus == "Complete" && "completed=true";
    axios
      .get(`http://127.0.0.1:3000/task?${query}`)
      .then((tasks) => setTasks(() => tasks.data));
  }, [selectedStatus, addedMessage]);

  const deleteHandle = async (id) => {
    const res = await axios.delete(`http://127.0.0.1:3000/task/${id}`);
    await setAddedMessage(() => ({
      type: "delete",
      message: res.data.message,
    }));
    setTasks((prev) => prev.filter((task) => task._id != id));
     setFormStatus(() => ({
      id: null,
      status: "Add",
    }))
  };
  const compleatedHandle = async (id) => {
    await axios.put(`http://127.0.0.1:3000/task/${id}`, { completed: true });
    setAddedMessage(() => ({
      type: "completed",
      message: "Task Compleated",
    }));
  };

  return (
    <>
      {addedMessage && <p className=" text-center">{addedMessage.message}</p>}

      <div className=" container mx-auto grid grid-cols-5 my-10 gap-4 md:gap-24">
        <div className=" max-w-sm mx-auto col-span-5 md:col-span-2">
          <Form
            setAddedMessage={setAddedMessage}
            addedMessage={addedMessage}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
          ></Form>
        </div>

        <div className=" col-span-5 md:col-span-3 border border-gray-100 rounded-lg p-8">
          <div className="max-w-sm mx-auto mt-3 ">
            <TaskStatus
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            ></TaskStatus>
          </div>

          <div className="mt-3 space-y-2 ">
            {tasks.map((task) => (
              <div
                className=" shadow p-2 flex justify-between rounded"
                key={task._id}
              >
                <div>
                  <h3 className=" text-xl font-semibold">{task.title}</h3>
                  <p>{task.desCription}</p>
                </div>
                <div>
                  <div className=" flex items-center text-xl space-x-1 mb-1">
                    <span
                      onClick={() => {
                        setFormStatus(() => ({
                          status: "Edit",
                          id: task._id,
                        }));
                      }}
                      className=" bg-blue-500 size-6 text-sm rounded-full text-white cursor-pointer flex items-center justify-center"
                    >
                      <FaPenSquare />
                    </span>
                    <span
                      onClick={() => deleteHandle(task._id) }
                      className=" bg-red-500 size-5 text-sm rounded-full text-white cursor-pointer flex items-center justify-center"
                    >
                      <MdDelete></MdDelete>
                    </span>
                    <span
                      onClick={() => compleatedHandle(task._id)}
                      className={`${
                        task.completed ? "bg-green-700" : "bg-green-500"
                      } size-5 text-sm rounded-full text-white cursor-pointer flex items-center justify-center`}
                    >
                      <MdOutlineDone></MdOutlineDone>
                    </span>
                  </div>
                  <button
                    className={`${
                      task.completed ? "bg-green-700" : "bg-red-600"
                    } text-white text-sm py-1 px-2  rounded cursor-pointer`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
