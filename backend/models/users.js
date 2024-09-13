import mongoose from "mongoose";

const urlRegex = /^.*$/ims;
///^(http|https):\/\/(w{3}}\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
// Esquema y modelo de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Eduardo Silva",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    default: "Inventor, scientist",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
    validate: {
      validator: function (v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es una URL válida`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Por favor ingrese una dirección de correo válida"],
  },
  password: {
    type: String,
    required: true,
    select: false, // Evitar que el hash de la contraseña se devuelva
  },
});

export default mongoose.model("User", userSchema);
