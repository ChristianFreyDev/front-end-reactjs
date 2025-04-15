
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa"; // Ícone de aviso
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import "./Alerta.css";

const Erro = (message) => {
  toast.error(message, {
    position: "top-center",
    width: 450,
    autoClose: 5000, // Fecha em 5 segundos
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: true,
    style: {borderWidth: 1, width: "450px",borderColor: "#ff0000aa"},
    // icon: <CircleAlert className="stroke-red-500" />, 
  });
}

const Sucesso = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000, // Fecha em 5 segundos
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: true,
    style: {borderWidth: 1, width: "450px",borderColor: "#00ff00aa"},
    // icon: <BadgeCheck className="stroke-green-500" />, 
  });
}

const Atencao = (message) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: 5000, // Fecha em 5 segundos
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: true,
    style: {borderWidth: 1, width: "450px", borderColor: "#f0c50eaa"},
    // icon: <TriangleAlert className="stroke-yellow-500" />, 
  });
}

const Informacao = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 5000, // Fecha em 5 segundos
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: true,
    style: {borderWidth: 1, width: "450px",borderColor: "#3197d9aa"},
    // icon: <Info className="stroke-indigo-400" />, 
  });
}

const Alerta = { Erro, Sucesso, Informacao, Atencao };

export default Alerta; 