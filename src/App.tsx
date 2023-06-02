import Provide from "./context/Provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.pages";
import HomePage from "./pages/home/home.page";
import CursoPage from "./pages/home/cursos/Curso.page";
import HorarioPage from "./pages/Horario/horario";
import { Navbar } from "react-bootstrap";
import { useState } from "react";
import AulasPages from "./pages/aulas/aulas.page";
import Asistencia from "./pages/asistencias/asistencia.page";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <Provide>
        <BrowserRouter>
          {isLoggedIn && <Navbar />}
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/curso" element={<CursoPage />} />
            <Route path="/horario" element={<HorarioPage />} />
            <Route path="/aulas" element={<AulasPages />} />
            <Route path="/asistencia" element={<Asistencia />} />
          </Routes>
        </BrowserRouter>
      </Provide>
    </>
  );
}

export default App;
