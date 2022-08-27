import React from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import { NuevaOferta } from "./NuevaOferta.jsx";
import { Ofertas } from "./Ofertas.jsx";
import { Usuario } from "./Usuario.jsx";

export const NavBar = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand font-italic">
            SearchJobs
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/ofertas" className="navbar-brand">
                  Todas las ofertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/usuario" className="navbar-brand">
                  Usuario
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/nueva-oferta" className="navbar-brand">
                  Nueva Oferta
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Ofertas />}></Route>
        <Route path="/ofertas" element={<Ofertas />}></Route>
        <Route path="/usuario" element={<Usuario />}></Route>
        <Route path="/nueva-oferta" element={<NuevaOferta />}></Route>
        <Route path="*" element={<h1>ERROR 404</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
