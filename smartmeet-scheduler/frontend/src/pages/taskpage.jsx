import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    if (!title) return alert("Please enter a task title");
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!isDeleting && !window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Your Tasks 📝</h1>

      <div className="bg-[#1e1b4b]/80 p-6 rounded-2xl mb-6 shadow-lg">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-3 bg-[#312e81]/60 rounded-lg outline-none text-gray-200 placeholder-gray-400"
        ></textarea>
        <button
          onClick={createTask}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition w-full"
        >
          Create Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-[#312e81]/80 p-4 rounded-xl flex justify-between items-center border border-white/10"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-400 hover:text-red-500 font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setIsDeleting(!isDeleting)}
          className={`${
            isDeleting ? "bg-red-600" : "bg-purple-600"
          } hover:opacity-80 px-6 py-2 rounded-lg font-medium transition`}
        >
          {isDeleting ? "Delete Mode: ON" : "Delete Mode: OFF"}
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
