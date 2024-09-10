import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
  createUser,
} from "../controllers/users.js";
import userValidation from "../validators/validatorUsers.js";

// Obtener todos los usuarios
router.get("/users", getUsers);

// Obtener un usuario por ID
router.get("/users/:userId", getUserId);

// Obtener la información del usuario actual
router.get("/users/me", getCurrentUser);

//Crear un Nuevo Usuario
router.post("/users", userValidation, createUser);

//Actualizar info perfil usuario
router.patch("/users/me", updateUserProfile);

//Actualizar Avatar usuario
router.patch("/users/me/avatar", updateUserAvatar);

export default router;
