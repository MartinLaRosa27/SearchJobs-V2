import React, { useRef } from "react";
import axios from "axios";

export const NuevaOferta = () => {
  const puesto = useRef();
  const empresa = useRef();
  const descripcion = useRef();
  const urlNuevaOferta = `http://${process.env.REACT_APP_BACKEND_URL}/post-trabajos`;

  const crearOferta = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(urlNuevaOferta, {
          puesto: puesto.current.value,
          empresa: empresa.current.value,
          descripcion: descripcion.current.value,
        })
        .then((res) => {
          alert(res.data);
        });
    } catch (e) {
      alert("No se pudo publicar la oferta de trabajo.");
    }
  };

  return (
    <div className="container">
      <form method="POST" onSubmit={(e) => crearOferta(e)}>
        <div className="mb-3">
          <label htmlFor="puesto" className="form-label">
            Puesto:
          </label>
          <input
            type="text"
            className="form-control"
            id="puesto"
            ref={puesto}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="empresa" className="form-label">
            Empresa:
          </label>
          <input
            type="text"
            className="form-control"
            id="empresa"
            ref={empresa}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción del puesto:
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="3"
            ref={descripcion}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Oferta
        </button>
      </form>
    </div>
  );
};
