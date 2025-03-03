const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes"); // Importa correctamente las rutas

const app = express();

app.use(express.json()); // Importante para recibir JSON en POST
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Usar las rutas
app.use("/api", taskRoutes); // <--- Revisa que esta línea esté bien

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
