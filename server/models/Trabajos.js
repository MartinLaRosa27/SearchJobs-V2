const mongoose = require("mongoose");

const trabajoSchema = new mongoose.Schema({
  _id: String,

  puesto: {
    type: String,
    required: true,
    minLength: [6, "El puesto tiene que tener al menos 6 caracteres"],
    maxLength: [90, "El puesto puede tener hasta 90 caracteres"],
  },
  empresa: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 90,
  },
  descripcion: {
    type: String,
    minLength: 15,
    maxLength: 300,
  },
});

module.exports = mongoose.model("Trabajo", trabajoSchema);
