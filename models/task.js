const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título de la tarea
  completed: { type: Boolean, default: false }, // Estado de la tarea (por defecto: false)
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
