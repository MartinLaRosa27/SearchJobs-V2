import React, { useEffect, useState } from "react";
import axios from "axios";

export const Usuario = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const urlGet = `http://${process.env.REACT_APP_BACKEND_URL}/get-postulaciones`;
  const urlDelete = `http://${process.env.REACT_APP_BACKEND_URL}/delete-postulaciones/`;

  const getPostulaciones = async () => {
    try {
      await axios.get(urlGet).then((res) => {
        setPostulaciones(res.data);
      });
    } catch (e) {
      setPostulaciones([]);
    }
  };

  const deleteProject = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`${urlDelete}${id}`).then((res) => {
        alert(res.data);
      });
    } catch (e) {
      alert("No se pudo eliminar la postulación");
    }
  };

  useEffect(() => {
    getPostulaciones();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Mis Postulaciones</h1>
      {/* Borrar Postulaciones */}
      <div className="editar-postulaciones">
        <ul className="list-group">
          {postulaciones.map((trabajo) => {
            return (
              <li className="list-group-item" key={trabajo._id}>
                {trabajo.puesto}
                <form onSubmit={(e) => deleteProject(e, trabajo.trabajoId)}>
                  <button
                    type="submit"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
