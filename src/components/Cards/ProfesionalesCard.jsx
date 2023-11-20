import React, { useState } from 'react';
import profImage from '../Cards/profesional.png';
import Modal from 'react-modal';


const ProfesionalesCard = ({ id, nombre, apellido, matricula, dni, telefono, tarifa}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="card shadow-lg" style={{ width: '16rem', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={profImage} alt="Profesional" className="img-fluid" />
          <button className="btn btn-primary mt-2" onClick={() => setModalIsOpen(true)}>Info</button>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Detalles del profesional"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            width: '10cm',
            height: '5cm',
            position: 'relative',
          },
        }}
      >
        {/* Contenido del modal aquí */}
        <h4>Detalles del profesional</h4>
        <p>Nombre: {nombre}</p>
        <p>Legajo: {id}</p>
        <p>Apellido: {apellido}</p>
        <p>Matricula: {matricula}</p>
        <p>DNI: {dni}</p>
        <button className="btn btn-primary" onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default ProfesionalesCard;
