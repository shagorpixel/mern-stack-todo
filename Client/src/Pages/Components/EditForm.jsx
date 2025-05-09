import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = ({ setAddedMessage }) => {
  const [data, setData] = useState({});
  
  const changeHandle = (e) => {
    const name = e.target.name;
    setData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    console.log(data);
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:3000/task", data);
      setAddedMessage({
        type: "delete",
        message:data.title + res.data.message,
      });
      setData({
        title:"",
        desCription:""
      })
    } catch (err) {
      console.log(err.message);
    }
  };
 useEffect(()=>{
    axios.get('')
 },[])

  return (
    <form
      onSubmit={submitHandle}
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
        Add Todo
      </button>
    </form>
  );
};

export default Form;
