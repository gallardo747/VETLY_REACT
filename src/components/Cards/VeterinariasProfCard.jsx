import React, { useState } from 'react';
import profImage from '../Cards/profesional.png';
import Modal from 'react-modal';
//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


const VeterinariasProfCard = ({ id_Veterinaria, razonSocial, cuit, calle, numero, piso, cp, barrio, telefono_Part, celular, provincia, pais}) => {
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
            <h5 className="card-title">{razonSocial}</h5>
            <p className="card-text">
                  <FormattedMessage id="veterinaria.Legajo" defaultMessage="Legajo #"/>{id_Veterinaria}</p>
            <p className="card-text">CUIT: {cuit}</p>
            <p className="card-text">
                <FormattedMessage id="veterinaria.Barrio" defaultMessage="Barrio:"/> {barrio}</p>
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
        <h4><FormattedMessage id="veterinaria.Detalles" defaultMessage="Detalles de la Veterinaria"/></h4>
        <p><FormattedMessage id="veterinaria.RazonSocial" defaultMessage="Razón Social:"/> {razonSocial}</p>
        <p>CUIT: {cuit}</p>
        <p><FormattedMessage id="veterinaria.Calle" defaultMessage="Calle:"/> {calle} - Nro: {numero} - Piso: {piso}  </p>
        <p><FormattedMessage id="veterinaria.Barrio" defaultMessage="Barrio:"/> {barrio} - CP: {cp}  - <FormattedMessage id="veterinaria.Provincia" defaultMessage="Provincia:"/> {provincia}</p>
        <p><FormattedMessage id="veterinaria.Telefono" defaultMessage="Teléfono:"/> {telefono_Part} - Cel:{celular} </p>
        <button className="btn btn-primary" onClick={() => setModalIsOpen(false)}>
              <FormattedMessage id="general.Cerrar" defaultMessage="Cerrar"/>
        </button>
      </Modal>
    </div>
  );
};

export default VeterinariasProfCard;
