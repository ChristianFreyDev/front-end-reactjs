import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from '/src/components/Alert/Alerta.jsx';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import api from '../../services/api';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function login(username, password) {
    const loginResponse = await api.get(`/Usuario/ValidarLogin/${username}&${password}`);
    
    if (loginResponse.data.dados == null) {
      Alerta.Erro(loginResponse.data.mensagem || "Erro desconhecido.")
    } else {
       Alerta.Sucesso(loginResponse.data.mensagem)

      navigate("/Modulo");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Acesse o sistema</h1>
        
        <div className="input-field">
          <input
            type="text"
            placeholder="Login"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
          />
          <FaUser className="icon" />
        </div>
        
        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Se a senha estiver vazia, mostra o cadeado. Senão, exibe o ícone do olho */}
          {password.length === 0 ? (
            <FaLock className="icon" />
          ) : (
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        
        <button className="login-button" type="submit" onClick={() => login(username, password)}>Logar</button>
      </form>
    </div>
  );
};

export default Login;
