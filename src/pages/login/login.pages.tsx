import { FormEvent, useContext, useEffect, useState } from "react";
import { ContextCurso } from "../../context/ContextCursos";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ onLogin }) => {
  const { user, setUser } = useContext(ContextCurso);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Lógica de inicio de sesión
    if (user.email == "harold" && user.password == "123") {
      onLogin();
    }
  };

  const OnLogin = (e: FormEvent) => {
    e.preventDefault();
    setUser({ email: valueEmail, password: valuePassword });
    console.log(valueEmail, valuePassword);
  };

  const loginComplete = user.email == "harold" && user.password == "123";

  useEffect(() => {
    if (loginComplete) {
      console.log(user);
      navigate("/home");
    }
  }, [loginComplete, navigate, user]);

  const error = !loginComplete ? "none" : "flex";

  return (
    <div className="container">
      <h1 className="title">Sistema de gestión de cursos y horarios</h1>
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form onSubmit={OnLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              onChange={(e) => setValueEmail(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setValuePassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button onClick={() => (loginComplete ? handleLogin() : false)}>
            Iniciar sesión
          </button>
        </form>
        <div className="forgot-password">
          <Link to={"/"}>¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
