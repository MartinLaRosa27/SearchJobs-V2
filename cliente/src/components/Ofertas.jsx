import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const Ofertas = () => {
  const [trabajos, setTrabajos] = useState([]);
  const url = `http://${process.env.REACT_APP_BACKEND_URL}/get-trabajos`;
  const urlPost = `http://${process.env.REACT_APP_BACKEND_URL}/post-postulaciones/`;

  const getTrabajos = async () => {
    try {
      await axios.get(url).then((res) => {
        setTrabajos(res.data);
      });
    } catch (e) {
      setTrabajos([]);
    }
  };

  useEffect(() => {
    getTrabajos();
  }, []);

  const enviarPostulacion = (e, id, puesto) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Desea enviar la postulación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, enviar",
        cancelButtonText: "No, prefiero esperar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // POSTULACION:
          try {
            await axios
              .post(`${urlPost}${id}/${puesto}`)
              .then((res) => {
                swalWithBootstrapButtons.fire(res.data, "", "success");
              })
              .catch((res) => {
                swalWithBootstrapButtons.fire(res.data, "", "error");
              });
          } catch (e) {
            swalWithBootstrapButtons.fire(
              "Postulación no enviada",
              "",
              "error"
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Postulación no enviada", "", "error");
        }
      });
  };

  return (
    <div className="container card-container">
      {trabajos.map((trabajo) => {
        return (
          <div className="card" style={{ width: "18rem" }} key={trabajo._id}>
            <div className="card-body">
              <h5 className="card-title">{trabajo.puesto}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {trabajo.empresa}
              </h6>
              <p className="card-text">{trabajo.descripcion}</p>
              <form
                onSubmit={(e) =>
                  enviarPostulacion(e, trabajo._id, trabajo.puesto)
                }
              >
                <button type="submit" className="btn btn-success">
                  Postularse
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};
