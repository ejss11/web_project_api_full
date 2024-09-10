import { celebrate, Joi, Segments } from "celebrate";
import validatorUrl from "./validateUrl.js";

const userValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validatorUrl), // validacion personalizada para el url del avatar
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default userValidation;
