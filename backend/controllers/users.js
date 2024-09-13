import User from "../models/users.js";
import bcrypt from "bcryptjs";

// GET /users — devuelve todos los usuarios

export const getUsers = (req, res) => {
  User.find({})
    .then((Users) => res.send(Users))
    .catch((err) =>
      res.status(500).send({
        message: `Error no se encontraron usuarios mensajeError: ${err}`,
      })
    );
};
// GET /users/:userId — devuelve un usuario especifico
export const getUserId = (req, res) => {
  const { userId } = req.params;
  try {
    User.findById(userId)
      .orFail(() => {
        const error = new Error(
          "Error no se encontro el id de usuario en la BD users"
        );
        error.statusCode = 404;
        throw error;
      })
      .then((users) => {
        res.status(200).send(users);
      });
  } catch (error) {
    res.status(500 || 404).json(error);
  }
};

// GET /users/me — devuelve la información del usuario actual
export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((userData) => {
      if (!userData) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.status(200).send(userData);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

// POST /users — Crear un Nuevo usuario
export const createUser = async (req, res) => {
  const { email, password } = req.body;

  //Generar un hash de la contraseña antes de guardar el usuario
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ email, password: hash });
    })
    .then((userData) => {
      //Evitar devolver el hash de la contraseña
      const userWithoutPassword = userData.toObject();
      delete userWithoutPassword.password;
      res.status(201).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Datos Invalidos" });
      } else if (err.statusCode === 11000) {
        res
          .status(409)
          .send({ message: "El correo electrónico ya esta registrado" });
      } else {
        res.status(500).send({ message: "Error interno del servidor" });
      }
    });
};

// PATCH /users/me — actualizar el perfil
export const updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.params;

  // Verificar si el usuario autenticado es el dueño del perfil que se intenta modificar
  if (!req.user._id.equals(userId)) {
    return res
      .status(403)
      .send({ message: "No tienes permiso para editar este perfil" });
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    )
      .orFail(() => {
        const error = new Error("Perfil no encontrado");
        error.statusCode = 404;
        throw error;
      })
      .then((userData) => {
        res.status(200).json(userData);
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// PATCH /users/me/avatar — actualizar el avatar user
export const updateUserAvatar = async (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  // Verificar si el usuario autenticado es el dueño del perfil que se intenta modificar
  if (!req.user._id.equals(userId)) {
    return res
      .status(403)
      .send({ message: "No tienes permiso para editar este avatar" });
  }

  try {
    await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    )
      .orFail(() => {
        const error = new Error("Perfil no encontrado");
        error.statusCode = 404;
        throw error;
      })
      .then((userData) => {
        res.status(200).json(userData);
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
