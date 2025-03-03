import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/tasks"; // Ruta del backend

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Cargar tareas desde el backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const createTask = async () => {
    if (!newTask.trim()) return; // Evitar tareas vacías

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) throw new Error("Error al crear tarea");

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]); // Actualizar estado
      setNewTask(""); // Limpiar input
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id)); // Actualizar estado
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={createTask}>Agregar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
