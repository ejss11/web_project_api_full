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
import { checkToken } from "../middleware/auth.js";

// Obtener todos los usuarios
router.get("/users", checkToken, getUsers);

// Obtener la información del usuario actual
router.get("/users/me", checkToken, getCurrentUser);

// Obtener un usuario por ID
router.get("/users/:userId", checkToken, getUserId);

//Crear un Nuevo Usuario
router.post("/users", userValidation, createUser);

//Actualizar info perfil usuario
router.patch("/users/me", checkToken, updateUserProfile);

//Actualizar Avatar usuario
router.patch("/users/me/avatar", checkToken, updateUserAvatar);

export default router;
