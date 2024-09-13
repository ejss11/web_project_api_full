import { baseUrl } from "./constants";
const BASE_URL = "https://api.eduardo.desarrollointerno.com";

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
export const checkToken = async () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
};
