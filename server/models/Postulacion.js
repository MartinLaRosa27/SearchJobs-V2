const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema({
  _id: String,

  trabajoId: {
    type: String,
    require: true,
  },

  puesto: {
    type: String,
    require: true,
  },
  
  usuarioId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Postulacion", postulacionSchema);
