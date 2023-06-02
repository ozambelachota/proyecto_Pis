import { useState } from "react";
import "./asistencia.css";
import Navbar from "../../components/navbar/navbar";

const Asistencias = () => {
  const [asistencias, setAsistencias] = useState([]);

  const generarAsistencias = () => {
    const alumnos = [];
    for (let i = 1; i <= 10; i++) {
      alumnos.push({
        id: i,
        nombre: `Alumno ${i}`,
        asistencia: "",
      });
    }
    setAsistencias(alumnos);
  };

  const handleAsistenciaChange = (id, value) => {
    const updatedAsistencias = asistencias.map((asistencia) =>
      asistencia.id === id ? { ...asistencia, asistencia: value } : asistencia
    );
    setAsistencias(updatedAsistencias);
  };

  const obtenerFechaActual = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const renderOpcionesAsistencia = (id) => {
    return (
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name={`asistencia-${id}`}
            value="asistio"
            checked={
              asistencias.find((asistencia) => asistencia.id === id)
                ?.asistencia === "asistio"
            }
            onChange={() => handleAsistenciaChange(id, "asistio")}
          />
          Asistió
        </label>
        <label>
          <input
            type="radio"
            name={`asistencia-${id}`}
            value="no-asistio"
            checked={
              asistencias.find((asistencia) => asistencia.id === id)
                ?.asistencia === "no-asistio"
            }
            onChange={() => handleAsistenciaChange(id, "no-asistio")}
          />
          No asistió
        </label>
        <label>
          <input
            type="radio"
            name={`asistencia-${id}`}
            value="justificado"
            checked={
              asistencias.find((asistencia) => asistencia.id === id)
                ?.asistencia === "justificado"
            }
            onChange={() => handleAsistenciaChange(id, "justificado")}
          />
          Justificado
        </label>
      </div>
    );
  };

  return (
    <Navbar>
      <div className="asistencia-view">
        <h1>Registro de Asistencias</h1>
        <button onClick={generarAsistencias}>Generar Asistencias</button>
        <div>
          <h2>Fecha: {obtenerFechaActual()}</h2>
          <table>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((asistencia) => (
                <tr key={asistencia.id}>
                  <td>{asistencia.nombre}</td>
                  <td>{renderOpcionesAsistencia(asistencia.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Navbar>
  );
};

export default Asistencias;
