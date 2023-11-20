import React from 'react';
import profImage from '../Cards/clinica.png';

const TurnoVeterinariasCard = ({ id_Veterinaria, razonSocial, cuit, barrio, calle, numero, selectedId, onCardSelect }) => {
  const isSelected = id_Veterinaria === selectedId;

  const handleCardClick = () => {
    onCardSelect(id_Veterinaria); // Llama a la función de selección de TurnoMedico.jsx con el ID de esta tarjeta
  };

  return (
    <div
    className={`card shadow-lg ${isSelected ? 'border-primary' : ''}`}
    style={{ width: '12.8rem', margin: '10px', cursor: 'pointer' }}
    onClick={handleCardClick}
    >
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={profImage} alt="Profesional" className="img-fluid" style={{ width: '80%', maxHeight: '80%' }} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: '1rem' }}>{razonSocial}</h5>
            <p className="card-text" style={{ fontSize: '0.875rem' }}>
              Legajo #{id_Veterinaria} - CUIT: {cuit} - 
              Calle: {calle} - N°: {numero} - Barrio: {barrio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnoVeterinariasCard;
