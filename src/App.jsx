import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Modulo/Dashboard";
import Cadastros from "./pages/Modulo/Cadastros";
import Pessoa from "./pages/Pessoa/Pessoa";
import Cidade from "./pages/Cidade/Cidade";
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import PrivateLayout from "./components/PrivateLayout/PrivateLayout";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer />

        <Routes>
          <Route path="/Login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <PrivateLayout />
              </PrivateRoute>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Cadastros" element={<Cadastros />} />
            <Route path="Pessoa" element={<Pessoa />} />
            <Route path="Cidade" element={<Cidade />} />

            {/* Rota padrão para qualquer rota inválida dentro das rotas privadas */}
            <Route path="*" element={<Navigate to="/Dashboard" />} />
          </Route>

          {/* Se o usuário não estiver autenticado e tentar acessar qualquer rota não definida, ele será redirecionado para o Login */}
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
