import jwt from "jsonwebtoken";
const { NODE_ENV, JWT_SECRET, BASE_URL } = process.env;
//import { baseUrl, groupId, token } from "./constants";

// Función para registrar un nuevo usuario
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Error: ${resp.status}`);
  });
};

// Función para iniciar sesión
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(`Error: ${resp.status}`);
    })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      return res;
    });
};

// Función para comprobar la validez del token
export const checkToken = (req, res, next) => {
  //Obtener el token del encabezado de autorizacion
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Autorización requerida" });
  }

  //Extraer el Token
  const token = authorization.replace("Bearer ", "");

  let Payload;
  try {
    //verificar token
    Payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "some-dev-secret"
    );
  } catch (error) {
    return res.status(403).send({ message: "Token no válido" });
  }

  req.user = Payload; //Agregar el payload a req.user
  next(); //Continuar con el siguiente middleware o controlador
};
