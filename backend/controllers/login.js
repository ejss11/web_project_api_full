import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

//Controlador para el login de usuarios
export const login = (req, res) => {
  const { email, password } = req.body;

  //Buscar al usuario por email
  User.findOne({ email })
    .select("+password") // Recuperar el hash de la contraseña
    .then((user) => {
      if (!user) {
        //Si el usuario no es encontrado, lanzar un error
        return res
          .status(401)
          .send({ message: "Correo electrónico o  contraseña incorrectos" });
      }

      //Si el usuario es encontrado, comparar la contraseña
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          //Si las  contraseñas no coinciden, lanzar error
          return res
            .status(401)
            .send({ message: "Correo electronico o contraseña incorrectos" });
        }

        //Si las contraseñas coinciden, generar el token JWT
        const token = jwt.sign(
          { _id: user._id }, //Payload del token, solo con el _id
          "some-secret-key", //clave secreta para firmar el token
          { expiresIn: "7d" } // El token expira en 7 dias
        );

        //Enviar el token del cliente
        return res.send({ token });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error interno del servidor" });
    });
};
