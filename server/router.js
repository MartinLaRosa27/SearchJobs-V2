const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const Trabajo = require("./models/Trabajos.js");
const Postulaciones = require("./models/Postulacion.js");

module.exports = () => {
  router.get("/get-trabajos", async (req, res) => {
    const trabajos = await Trabajo.find();
    res.send(trabajos);
  });

  router.post("/post-trabajos", async (req, res) => {
    const { puesto, empresa, descripcion } = req.body;
    try {
      const trabajo = await Trabajo.create({
        _id: shortid.generate(),
        puesto: puesto,
        empresa: empresa,
        descripcion: descripcion,
      });
      trabajo.save();
      res.send("Oferta publicada");
    } catch (e) {
      res.send(e.message);
    }
  });

  router.post("/post-postulaciones/:id/:puesto", async (req, res) => {
    try {
      const postulacionEx = await Postulaciones.find({
        trabajoId: req.params.id,
        usuarioId: "1",
      });
      if (postulacionEx.length <= 0) {
        await Postulaciones.create({
          _id: shortid.generate(),
          trabajoId: req.params.id,
          usuarioId: 1,
          puesto: req.params.puesto,
        });
        res.send("Postulación creada");
      } else {
        res.send("La postulación ya existe");
      }
    } catch (e) {
      res.send(e.message);
    }
  });

  router.get("/get-postulaciones", async (req, res) => {
    const postulaciones = await Postulaciones.find({ usuarioId: "1" });
    res.send(postulaciones);
  });

  router.delete("/delete-postulaciones/:id", async (req, res) => {
    try {
      await Postulaciones.deleteOne({ trabajoId: req.params.id });
      res.send("Postulación eliminada");
    } catch (e) {
      res.send("No se pudo eliminar la postulacion");
    }
  });

  return router;
};
