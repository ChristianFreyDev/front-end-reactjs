import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MyAppBar from "./components/AppBar/AppBar";
import Login from "./pages/Login/Login";
import Modulo from "./pages/Modulo/Modulo";
import Cadastros from "./pages/Modulo/Cadastros";
import Pessoa from "./pages/Pessoa/Pessoa";
import Cidade from "./pages/Cidade/Cidade";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/Login" ;
  const isModulePage = location.pathname === "/Modulo";

  return (
    <div className="App">
      {!isLoginPage && !isModulePage && <MyAppBar />}
      <ToastContainer  />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Modulo" element={<Modulo />} />
          <Route path="/Cadastros" element={<Cadastros />} />
          <Route path="/Pessoa" element={<Pessoa />} />
          <Route path="/Cidade" element={<Cidade />} />



          <Route path='*' element={<Navigate to='/Modulo' />} />

          {/* <Route path="/TesteButton" element={<Botao.Buscar text="Buscar"/>} /> */}
        </Routes>
    </div>
  );
}

export default App;
