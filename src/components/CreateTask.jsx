import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }

    if (task.name.length > 100) {
      return toast.error("A task must not be more than 100 characters");
    }

    setTasks((prev) => {
      const list = [...prev, task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-64 h-12 px-1 mr-4 border-2 rounded-md border-slate-400 bg-slate-100"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="h-12 px-4 text-white rounded-md bg-cyan-500">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
