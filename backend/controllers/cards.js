import card from "../models/cards.js";

// GET /cards — devuelve todos las tarjetas
export const getAllCards = (req, res) => {
  card
    .find()
    .then((cards) => res.send(cards))
    .catch((err) =>
      res.status(500).send({
        message: `Error al obtener tarjetas: ${err}`,
      })
    );
};

// POST /cards — crea una nueva tarjeta
export const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  try {
    const cardNew = new card({ name, link, owner: req.user._id });
    cardNew.save();
    res.status(201).json(cardNew);
  } catch (err) {
    res.status(400).json({
      message: `Error al crear tarjeta, ${err.message}`,
    });
  }
};

// DELETE /cards/:cardId — elimina una tarjeta por _id
export const deleteCard = (req, res) => {
  const { cardId } = req.params;

  card
    .findById(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((cardData) => {
      //verificar si el usuario autenticado es el propietario de la tarjeta
      if (!cardData.owner.equals(req.user._id)) {
        return res
          .status(403)
          .send({ message: "No tienes permiso para borrar esta tarjeta" });
      }
      return card.findByIdAndDelete(cardId);
    })
    .then(() =>
      res.status(200).send({ message: "Tarjeta Eliminada Correctamente" })
    )
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

//PUT /cards/:cardId/likes — dar like a una tarjeta
export const updateLikesCard = async (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    await card
      .findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: { _id: _id, name: name, about: about } } },
        { new: true }
      )
      .orFail(() => {
        const error = new Error("Error al dar like a la tarjeta");
        error.statusCode = 400;
        throw error;
      })
      .then((likeCard) => {
        res.status(200).json(likeCard);
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
//DELETE /cards/:cardId/likes — dar unlike a una tarjeta
export const removeLikeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    await card
      .findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true }
      )
      .orFail(() => {
        const error = new Error("Error a quitar like de la tarjeta");
        error.statusCode = 400;
        throw error;
      })
      .then((rmLikeCard) => {
        res.status(200).json(rmLikeCard);
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
