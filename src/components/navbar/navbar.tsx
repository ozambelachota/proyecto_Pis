import { Link } from "react-router-dom";
import "./navegacion.css";
import { useContext, useState } from "react";
import { ContextCurso } from "../../context/ContextCursos";

const Navbar = ({ children }) =>{
  const { user } = useContext(ContextCurso);

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <img src="/public/gente.png" alt="Logo" />
          <h2 className="user-name">{user.email}</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/home" className="sidebar-link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/curso" className="sidebar-link">
              Mis cursos
            </Link>
          </li>
          <li>
            <Link to="/horario" className="sidebar-link">
              Horarios
            </Link>
          </li>
          <li>
            <Link to="/asistencia" className="sidebar-link">
              Asistencia
            </Link>
          </li>
          <li>
            <Link to="/gestion" className="sidebar-link">
              Gestión de aulas y laboratorios
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1 className="main-title">Bienvenido al sistema de gestion de cursos y horarios</h1>
        {children}
      </div>
    </>
  );
};
export default Navbar;
