import {React, useState, useEffect, useContext}  from 'react';
import profImage from '../Cards/profesional.png';
import Modal from 'react-modal';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '@/contexts/user';
import './StyleCards.css'
import { useVeterinarias } from '@/hooks/useVeterinariasASuscribir';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useVeterinariaProfesional } from '@/hooks/useVeterinariaProfesional';
import TurnoVeterinariasCard from './TurnoVeterinariasCard';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------

const VeterinariasASuscribirCard = ({isModalOpen, handleCloseModal, id_Profesional}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);


      // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
    const { GLOBALVetly } = useContext(UserContext);
    const { RegistrarVeterinaria } = useVeterinariaProfesional();
        
      // CARGAR LAS VARIABLES DE LA VETERINARIA
    const [selectedVeterinariaId, setSelectedVeterinariaId] = useState(-1);
    const [selectedVeterinary, setSelectedVeterinary] = useState('');
    

    const [, navigate] = useLocation();

      // PASO 1: CARGAR LAS VETERINARIAS - Cargar solo una vez al cargar la página
    const { veterinarias } = useVeterinarias(GLOBALVetly.id);
    const [veterinariasLoaded, setVeterinariasLoaded] = useState(false);
    const [filteredVeterinarias, setFilteredVeterinarias] = useState(veterinarias);

    
    useEffect(() => {
        if (!veterinariasLoaded) {
        // Llamar a la función para cargar las veterinarias solo si aún no se han cargado
        // Este efecto se ejecutará solo una vez al cargar la página
        setVeterinariasLoaded(true);
        }
    }, [veterinariasLoaded, veterinarias]);

      // PASO 3: SELECCIONAR UNA VETERINARIA

      function handleSelectVeterinaria(veterinaria) {
        setSelectedVeterinariaId(veterinaria.id);
        setSelectedVeterinary(veterinaria.razonSocial);
        setIsSaveButtonDisabled(false);
       
      }

      function handleGuardarClick()
      {
            //PASO 1: ARMAR OBJETO VETERINARIA_PROFESIONAL

            const oVeterinariaProfesional = {
              id_Veterinaria: selectedVeterinariaId,
              id_Profesional: id_Profesional,
              fechaSolicitudEnviada: null,
              fechaSolicitudAprobada: null,
              fechaBaja: null,
              activo: "P",
              auD_FechaModify: null,
            };


            // Llamar a la función para ACTUALIZAR LA VETERINARIA
            RegistrarVeterinaria(GLOBALVetly.id, oVeterinariaProfesional);

            // PASO 2: ESA RELACIÓN VETERINARIA - PROFESIONAL necesita 1 tarifa en 0

            const oNuevaTarifa = {
              id_veterinaria_profesional:id_Profesional,  // Paso sólo el Profesional
              tarifa: 0,
              activo:'S'
          };



              // Mostrar el mensaje de éxito durante 1 segundo
              setSuccessMessage('Solicitud enviada exitosamente');

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
      
      const handleSearchVeterinarias = (searchText) => {
        // Filtrar las veterinarias basadas en el texto ingresado
        setSelectedVeterinariaId(-1); 
        const filteredVeterinarias = veterinarias.filter((veterinaria) =>
          veterinaria.razonSocial.toLowerCase().includes(searchText.toLowerCase())
        );
        // Actualizar el estado con las veterinarias filtradas
        setFilteredVeterinarias(filteredVeterinarias);
      };

      

      
  return (
    <div className="card shadow-lg" style={{ width: '25rem', margin: '15px' }}>

        <div className="col-md-8">
          <div className="card-body">
            
                <h3 className='text-lg font-semibold mb-2'>
                    <FormattedMessage id="veterinariaASuscribir.Buscar" defaultMessage="Buscar Veterinaria:"/>
                      
                </h3>
              
                {/* Campo de búsqueda de veterinarias por nombre */}
                <div className="mb-2 flex border rounded border-gray-300">
                    <input
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                        const searchText = e.target.value.toLowerCase();
                        handleSearchVeterinarias(searchText);
                    }}
                    className="form-input flex-1 pl-2 py-1 rounded-l-none"
                    />
                    <span className="bg-gray-300 py-1 px-2 rounded-l rounded-r-none">
                    <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>
          
                {/* Mostrar el contador de coincidencias si hay texto en el campo de búsqueda */}
                {filteredVeterinarias.length > 0 && (
                    <p className="text-sm text-gray-500">{filteredVeterinarias.length} 
                        <FormattedMessage id="veterinariaASuscribir.Coincidencias" defaultMessage="coincidencias"/>
                    </p>
                )}

                {/* Cards de las veterinarias */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {filteredVeterinarias.map((veterinaria) => (
                                      <TurnoVeterinariasCard
                                        key={veterinaria.id}
                                        id_Veterinaria={veterinaria.id}
                                        razonSocial={veterinaria.razonSocial}
                                        cuit={veterinaria.cuit}
                                        calle={veterinaria.calle}
                                        numero={veterinaria.numero}
                                        barrio={veterinaria.barrio}
                                        selectedId={selectedVeterinariaId}
                                        onCardSelect={(id) => {setSelectedVeterinariaId(id); 
                                                              setSelectedVeterinary(veterinaria.razonSocial);
                                                              setIsSaveButtonDisabled(false);} }
                                      />
                                    ))}
                                  </div>


                    {/* Mapa */}
                    <MapContainer center={[-34.6118, -58.4173]} zoom={13} style={{ height: '270px', width: '170%' }}>
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {veterinarias.map((veterinaria) => (
                            <Marker
                            key={veterinaria.id}
                            position={[veterinaria.coordenadaX, veterinaria.coordenadaY]}
                            
                        >
                            <Popup>
                            <div>
                            <h4>{veterinaria.razonSocial}</h4>
                            <p>{veterinaria.calle} {veterinaria.numero}</p>
                            <button type="button" class="btn btn-primary" onClick={() => 
                                    handleSelectVeterinaria(veterinaria)
                                    }>
                                    <FormattedMessage id="veterinariaASuscribir.seleccionar" defaultMessage="Seleccionar"/> 
                              </button>
                            </div>
                        </Popup>
                        </Marker>                  
                            ))}


                        </MapContainer>
            
             </div>
        </div>


        <div className="flex justify-center mt-4"> {/* Cambia 'justify-end' a 'justify-center' */}
            <button
                className="btn btn-primary"
                onClick={handleGuardarClick}
                disabled={isSaveButtonDisabled}
            >
                <FormattedMessage id="veterinariaASuscribir.suscribirme" defaultMessage="SUSCRIBIRME"/> 
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

export default VeterinariasASuscribirCard;
