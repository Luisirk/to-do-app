const express = require("express");
const Task = require("../models/task"); // Asegúrate de que la importación es correcta

const router = express.Router();

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// Crear una nueva tarea
router.post("/tasks", async (req, res) => {
  console.log("Datos recibidos:", req.body); // <-- Esto ayuda a depurar
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

module.exports = router;
