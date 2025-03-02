const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/tasks', (req, res) => {
  res.json({ message: 'Lista de tareas' });
});

module.exports = router;
