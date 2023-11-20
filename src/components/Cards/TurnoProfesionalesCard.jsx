import React from 'react';
import profImage from '../Cards/profesional.png';

const TurnoProfesionalesCard = ({ id, nombre, apellido, matricula, dni, tarifa, selectedId, onCardSelect }) => {
  const isSelected = id === selectedId;

  const handleCardClick = () => {
    onCardSelect(id); // Llama a la función de selección de TurnoMedico.jsx con el ID de esta tarjeta
  };

  return (
    <div
      className={`card shadow-lg ${isSelected ? 'border-primary' : ''}`}
      style={{ width: '12.8rem', margin: '10px', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={profImage} alt="Profesional" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nombre} {apellido}</h5>
            <p className="card-text">Legajo #{id}</p>
            <p className="card-text">Matrícula: {matricula}</p>
            <p className="card-text">Tarifa: ${tarifa}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnoProfesionalesCard;
