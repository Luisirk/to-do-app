require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
const uri = process.env.MONGO_URI; // La URL estará en el archivo .env
mongoose.connect(process.env.MONGO_URI);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send("🚀 Servidor funcionando correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
