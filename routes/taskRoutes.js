const express = require('express');
const Task = require('../models/Task'); // Importamos el modelo


const router = express.Router();

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

module.exports = router;

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});
const createTask = async (title) => {
  try {
    const response = await api.post("/tasks", { title }); // Envía la nueva tarea
    setTasks([...tasks, response.data]); // Actualiza el estado
  } catch (error) {
    console.error("Error al crear tarea:", error);
  }
};

return (
  <TaskContext.Provider value={{ tasks, fetchTasks, createTask }}>
    {children}
  </TaskContext.Provider>
);
// Editar una tarea por ID
router.put("/tasks/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true } // Devolver la tarea actualizada
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});