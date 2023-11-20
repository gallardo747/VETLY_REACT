import {React, useState, useEffect, useContext}  from 'react';
import profImage from '../Cards/profesional.png';
import Modal from 'react-modal';
import { useTarifa } from '/src/hooks/useTarifa';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '/src/contexts/user';
import { RegistrarTarifa } from '../../services/tarifas';
import './StyleCards.css'


//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------

const VeterinariasProfTarifaCard = ({ id_Profesional, id_Veterinaria, razonSocial, cuit}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [nuevaTarifa, setNuevaTarifa] = useState(0);
  const [tarifaError, setTarifaError] = useState('');

    // BUSCAR TARIFA

    const oProfesional = {
        id:id_Profesional, 
    };
    const { tarifas } = useTarifa(oProfesional,id_Veterinaria);


      // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
    const { GLOBALVetly } = useContext(UserContext);


    const [, navigate] = useLocation();

    const handleGuardarClick = () => {

        const tarifaValido = nuevaTarifa.length > 0 && nuevaTarifa.length < 11;

        // Verificar la nueva Tarifa
        if (!nuevaTarifa) {
            setTarifaError('La tarifa no puede estar vacía');
            return; // No continuar con la actualización
        } else if (nuevaTarifa.length > 10) {
            setTarifaError('Hasta 10 caracteres permitidos en la Tarifa');
            return; // No continuar con la actualización
        } else if (!/^\d+(\.\d{1,2})?$/.test(nuevaTarifa)) {
            setTarifaError('La tarifa debe ser un número válido con hasta dos decimales');
            return; // No continuar con la actualización
        } else {
            setTarifaError('');
        }


        if (tarifaValido) {
        
        const oNuevaTarifa = {
            id_veterinaria_profesional:id_Profesional,  // Paso sólo el Profesional
            tarifa: nuevaTarifa,
            activo:'S'
        };

        // Llamar a la función REGISTRAR TARIFA
        RegistrarTarifa(GLOBALVetly.id, oNuevaTarifa, id_Veterinaria);
        
        // Cerrar el modal y limpiar el nombre
        setModalIsOpen(false);
        setNuevaTarifa(0);
        // Mostrar el mensaje de éxito durante 1 segundo
        setSuccessMessage('Tarifa actualizada exitosamente');

        setTimeout(() => {
        setSuccessMessage('');
        // Redirigir al inicio después de mostrar el mensaje
        navigate('/');
        }, 1000);

    }
    };


  useEffect(() => {
    // Habilitar el botón GUARDAR cuando todas las condiciones son verdaderas
    if (
        nuevaTarifa.length != 0 
    ) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [nuevaTarifa]);


  return (
    <div className="card shadow-lg" style={{ width: '16rem', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={profImage} alt="Profesional" className="img-fluid" />
          <button className="btn btn-primary mt-2" onClick={() => setModalIsOpen(true)}>
              <FormattedMessage id="honorarios.editar" defaultMessage="EDITAR TARIFA"/>
          </button>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{razonSocial}</h5>
            <p className="card-text">CUIT: {cuit}</p>
            <p className="card-text">
                  <FormattedMessage id="honorarios.tarifa" defaultMessage="Tarifa: $" />
                  <span className="bold-text">
                  {tarifas && tarifas.tarifa !== null ? tarifas.tarifa : 0}
                  </span>
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Actualización de Tarifas del Profesional"
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
                width: '28%',
                position: 'relative',
              },
        }}
      >
        {/* Formulario para editar la tarifa */}
        <h2 className="text-xl font-bold mb-4">Actualizar Tarifa:</h2>

        <div className="w-2/3 pr-2">
            <label htmlFor="txtTarifaActual" className="block text-sm font-medium text-gray-700">
            TARIFA ACTUAL:
            </label>
            <input
            type="text"
            id="txtTarifaActual"
            name="txtTarifaActual"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="txtTarifaActual"
            defaultValue={tarifas && tarifas.tarifa !== null ? tarifas.tarifa : 0}
            readOnly
          />
        </div>

        
        <div className="w-2/3 pr-2">
            <label htmlFor="txtTarifaNueva" className="block text-sm font-medium text-gray-700">
            NUEVA TARIFA:
            </label>
            <input
            type="text"
            id="txtTarifaNueva"
            name="txtTarifaNueva"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Ingrese la nueva Tarifa"
            defaultValue='0'
            onChange={(e) => {
                setNuevaTarifa(e.target.value);
                setTarifaError(''); 
              }}
          />
          {tarifaError && (
            <p className="text-red-500 text-xs mt-2">{tarifaError}</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
             <button className="btn btn-secondary mr-2" onClick={() => setModalIsOpen(false)}>
                CANCELAR
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGuardarClick}
                disabled={isSaveButtonDisabled}
              >
                GUARDAR
              </button>
        </div>

      </Modal>
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeterinariasProfTarifaCard;
