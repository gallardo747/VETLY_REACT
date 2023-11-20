import {React, useState, useEffect, useContext}  from 'react';
import profImage from '../Cards/profesional.png';
import Modal from 'react-modal';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '@/contexts/user';
import './StyleCards.css'
import { useSolicitudesProfesionalesAAprobar } from '@/hooks/useSolicitudesProfesionalesAAprobar';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useVP } from '@/hooks/useVP';
import ProfesionalesCard from './ProfesionalesCard';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------

const SolicitudesAAprobarCard  = ({isModalOpen, handleCloseModal, id_Vete}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);


      // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
    const { GLOBALVetly } = useContext(UserContext);
    const { AprobarSolicitud } = useSolicitudesProfesionalesAAprobar();
        
      // CARGAR LAS VARIABLES DE LA VETERINARIA
    const [selectedProfesionalId, setSelectedProfesionalId] = useState(-1);
    const [selectedSolicitudNombre, setSelectedSolicitudNombre] = useState(''); 

    const [, navigate] = useLocation();

      // PASO 1: CARGAR LAS VETERINARIAS - Cargar solo una vez al cargar la página
    const { solicitudesProf } = useSolicitudesProfesionalesAAprobar(GLOBALVetly.id);
    const [solicitudesLoaded, setsolicitudesLoaded] = useState(false);
    

    
    useEffect(() => {
        if (!solicitudesLoaded) {
        // Llamar a la función para cargar las veterinarias solo si aún no se han cargado
        // Este efecto se ejecutará solo una vez al cargar la página
        setsolicitudesLoaded(true);
        }
    }, [solicitudesLoaded, solicitudesProf]);


      // PASO 2: OBTENER el objeto VETERINARIA-PROFESIONAL

      const oVeterinaria = {
        id:id_Vete,
      };

      const { veterinariaProfesional, actualizarVP } = useVP(oVeterinaria, selectedProfesionalId);

        // Efecto para actualizar VP cuando selectedProfesionalId cambie
      useEffect(() => {
        if (selectedProfesionalId !== -1) {
          actualizarVP(oVeterinaria, selectedProfesionalId);
        }
      }, [selectedProfesionalId]);

      
      // PASO 3: SELECCIONAR UNA VETERINARIA

      function handleSelectProfesional(solicitud) {
        setSelectedProfesionalId(solicitud.id_Profesional);
        setIsSaveButtonDisabled(false);
        setSelectedSolicitudNombre(solicitud.nombre);

       
      }

      function handleGuardarClick()
      {
            //PASO 1: ARMAR OBJETO VETERINARIA_PROFESIONAL

            const oVeterinariaProfesional = {
              id:veterinariaProfesional.id,
              id_Veterinaria: id_Vete,
              id_Profesional: selectedProfesionalId,
              activo: "S",
              auD_FechaCreate: veterinariaProfesional.auD_FechaCreate,
              fechaSolicitudEnviada: veterinariaProfesional.fechaSolicitudEnviada,
            };
            // Llamar a la función para ACTUALIZAR LA VETERINARIA
            AprobarSolicitud(GLOBALVetly.id, oVeterinariaProfesional);

              // Mostrar el mensaje de éxito durante 1 segundo
              setSuccessMessage('Solicitud Aprobada exitosamente');

              setTimeout(() => {
              setSuccessMessage('');
              // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
                      navigate('/');
              }, 1000);

      }

            // Agregar un efecto para ocultar la alerta después de un tiempo
      useEffect(() => {
        if (showAlert) {
          const timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 3000); // Ocultar la alerta después de 3 segundos (puedes ajustar el tiempo)
          
          return () => {
            clearTimeout(timeoutId); // Limpiar el temporizador en caso de que el componente se desmonte antes de que se muestre la alerta
          };
        }
      }, [showAlert]);
            

      
      const cardContainerStyle = {
        display: 'flex',
        flexDirection: 'column', // Muestra las tarjetas una debajo de la otra
        alignItems: 'center', // Alinea las tarjetas en el centro horizontalmente
      }
      
  return (
    <div style={cardContainerStyle}>

        <div className="col-md-8">
          <div className="card-body">
            
                <h3 className='text-lg font-semibold mb-2'>
                    <FormattedMessage id="solicitudAAprobar.seleccionar" defaultMessage="Seleccionar Profesional a Autorizar:"/> {selectedSolicitudNombre}
                </h3>
              
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={cardContainerStyle}>
                  {solicitudesProf.map((solicitud) => (
                    <div key={solicitud.id} onClick={() => handleSelectProfesional(solicitud)}
                    >
                      <ProfesionalesCard
                        id={solicitud.id}
                        nombre={solicitud.nombre}
                        apellido={solicitud.apellido}
                        matricula={solicitud.matricula}
                        dni={solicitud.dni}
                        tarifa={solicitud.tarifa}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>


             </div>
        </div>


        <div className="flex justify-center mt-4"> {/* Cambia 'justify-end' a 'justify-center' */}
            <button
                className="btn btn-primary"
                onClick={handleGuardarClick}
                disabled={isSaveButtonDisabled}
            >
                <FormattedMessage id="solicitudAAprobar.autorizar" defaultMessage="AUTORIZAR"/> 
            </button>
        </div>
      {successMessage && (
        <div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg"  style={{ position: 'absolute', top: '60px', right: '60px' }}> 
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesAAprobarCard;
