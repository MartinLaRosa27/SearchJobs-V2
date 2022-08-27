const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  _id: String,

  nombre: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 90,
  },
  apellido: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 90,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
