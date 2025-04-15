import React from "react";

const ModuloCard = ({ icon: Icon, title, onClick, color }) => {
  return (
    <button 
      className="modulo-card" 
      onClick={onClick} 
      style={{ backgroundColor: color }}
    >
      <Icon className="icon" />
      <span className="title">{title}</span>
    </button>
  );
};

export default ModuloCard;
