import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as auth from "./middleware/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import { logRequests } from "./middleware/requestLogger.js";
import { errors } from "celebrate";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
//importar controladores  users y login
import { createUser } from "./controllers/users.js";
import { login } from "./controllers/login.js";

//importar router
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";

const { PORT = 3001, DB_URL } = process.env;
// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  cors({
    origin: "https://eduardo.desarrollointerno.com",
  })
);
console.log(DB_URL);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectarse a MongoDB", err);
  });

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware para registrar todas las solicitudes
app.use(logRequests);

//Definir las rutas para el registro y el inicio de sesion
app.post("/signup", createUser);
app.post("/signin", login);

//Aplicar el middleware de autorizacion  a todas las rutas protegidas
app.use(auth.checkToken);

// Usar las rutas
app.use("/", usersRoutes);
app.use("/", cardsRoutes);

// Middleware para manejo de errores de Celebrate
app.use(errors());

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso Solicitado no encontrado" });
});

//Iniciar el Servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
