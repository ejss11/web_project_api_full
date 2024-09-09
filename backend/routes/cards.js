import express from "express";
const router = express.Router();
import {
  getAllCards,
  createCard,
  deleteCard,
  updateLikesCard,
  removeLikeCard,
} from "../controllers/cards.js";

// Obtener todas las tarjetas
router.get("/cards", getAllCards);

//Crear Nuevas Tarjetas
router.post("/cards", createCard);

//Eliminar Tarjetas
router.delete("/cards/:cardId", deleteCard);

// Agregar Likes a Tarjeta
router.put("/cards/:cardId/likes", updateLikesCard);

// Eliminar Like a Tarjeta
router.delete("/cards/:cardId/likes", removeLikeCard);

export default router;
