import React from "react";
import { useNavigate } from "react-router-dom";
import ModuloCard from "../../components/Card/ModuloCard";
import { FaChartBar, FaFileAlt, FaCog, FaUser, FaPen, FaDoorOpen, FaArrowAltCircleUp, FaPowerOff } from "react-icons/fa";
import "../../components/Card/ModuloCard.css";

const Modulo = () => {
  const navigate = useNavigate();

  const handleModuleClick = (moduleName) => {
    navigate(`/${moduleName}`);
  }; 

  return (
    <div className="modulo-container">
      <ModuloCard icon={FaFileAlt} title="Cadastros" onClick={() => handleModuleClick("Cadastros")} color="#1E90FFcc" />
      <ModuloCard icon={FaCog} title="Configurações" onClick={() => handleModuleClick("Configuracoes")} color="#FFA500cc" />
      <ModuloCard icon={FaChartBar} title="Relatórios" onClick={() => handleModuleClick("Relatorios")} color="#4CAF50cc" />
      <ModuloCard icon={FaUser} title="Teste pessoa" onClick={() => handleModuleClick("Pessoa")} color="#8B1AE1cc" />
      <ModuloCard icon={FaPowerOff} title="Teste button" onClick={() => handleModuleClick("TesteButton")} color="#0ABAAAcc" />
      <ModuloCard icon={FaArrowAltCircleUp} title="Teste 2" onClick={() => handleModuleClick("Pessoa")} color="#1B3AE1cc" />
      <ModuloCard icon={FaDoorOpen} title="Teste cidade" onClick={() => handleModuleClick("Cidade")} color="#618AA1cc" />
      <ModuloCard icon={FaPen} title="Teste 4" onClick={() => handleModuleClick("Pessoa")} color="#FF5B41cc" />
    </div>
  );
};

export default Modulo;
