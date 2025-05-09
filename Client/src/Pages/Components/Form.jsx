import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = ({ setAddedMessage, formStatus, setFormStatus, }) => {
  const [data, setData] = useState({ title: "", desCription: "" });
  const formStatusHandle = () => {
    setFormStatus(() => ({
      id: null,
      status: "Add",
    }));
    setData({
      title: "",
      desCription: "",
    });
  };

  useEffect(() => {
    if (formStatus.status == "Edit") {
      try {
        axios
          .get(`http://127.0.0.1:3000/task/${formStatus.id}`)
          .then((res) => setData(() => res.data));
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [formStatus.id, formStatus.status]);

  const changeHandle = (e) => {
    const name = e.target.name;
    setData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:3000/task", data);
      setAddedMessage({
        type: "delete",
        message: data.title + res.data.message,
      });
      setData({
        title: "",
        desCription: "",
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:3000/task/${formStatus.id}`,
        data
      );
      setAddedMessage(() => ({
        type: "update",
        message: data.title + res.data.message,
      }));
    } catch (error) {
      setAddedMessage(() => ({
        type: "update",
        message: error.message,
      }));
    }
  };
  console.log(formStatus);
  return (
    <form
      onSubmit={formStatus.status === "Add" ? submitHandle : updateHandle}
      className=" w-full p-12 bg-green-600 space-y-2"
    >
      <input
        onChange={changeHandle}
        className=" w-full py-1 px-2 text-lg bg-white rounded"
        type="text"
        placeholder="Task Title"
        name="title"
        value={data.title}
      />
      <textarea
        onChange={changeHandle}
        className=" w-full py-1 px-2 text-lg bg-white rounded"
        name="desCription"
        placeholder="Description"
        id=""
        value={data.desCription}
      ></textarea>
      <button className=" w-full py-1 px-2 text-lg bg-white rounded cursor-pointer">
        {formStatus.status == "Add" ? "Add Task" : "Update Tusk"}
      </button>
      {formStatus.status === "Edit" && (
        <button
          className="w-full py-1 px-2 text-lg bg-white rounded cursor-pointer"
          onClick={formStatusHandle}
        >
          Add Task{" "}
        </button>
      )}
    </form>
  );
};

export default Form;
