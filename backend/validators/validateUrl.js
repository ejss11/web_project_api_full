import { celebrate, Joi, errors, Segments } from "celebrate";
import validator from "validator";

//validacion personalizada para URLs usando validator.isURL
const validatorUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri"); // Error de la validacion si no es una URL valida
};

export default validatorUrl;
