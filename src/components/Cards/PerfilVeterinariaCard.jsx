import {React, useState, useEffect, useContext}  from 'react';
import clienteImage from '../Cards/clinica.png';
import Modal from 'react-modal';
import { UserContext } from '/src/contexts/user';
import { Route, Link, useLocation} from 'wouter';
import { useVeterinarias } from '/src/hooks/useVeterinarias';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import cardcss from './StyleCards.css'
//import L from 'leaflet';

// IMPORTAR LAS DIMENSIONES

import { usePaises } from '/src/hooks/usePaises';
import { useProvincias } from '/src/hooks/useProvincias';
import { useCiudades } from '/src/hooks/useCiudades';

const PerfilVeterinariaCard = ({ id, razonSocial, calle, numero, piso, cp, idPais, idProvincia, idCiudad, cuit, telefono, fechaCreacion, latitud, longitud }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  // CARGAR LAS DIMENSIONES
  const { paises } = usePaises();
  const { provincias } = useProvincias();
  const { ciudades } = useCiudades();
  
  const [razonSocialVET, setRazonSocialVET] = useState(razonSocial);
  const [cuitVET, setCuitVET] = useState(cuit);

  const [cuitError, setCuitError] = useState('');

  const [isPaisId, setIsPaisId] = useState(idPais);
  const [isProvinciaId, setIsProvinciaId] = useState(idProvincia);
  const [isCiudadId, setIsCiudadId] = useState(idCiudad);
  const [calleCliente, setCalleCliente] = useState(calle);
  const [numeroCliente, setNumeroCliente] = useState(numero);
  const [telefonoCliente, setTelefonoCliente] = useState(telefono);
  const [pisoCliente, setPisoCliente] = useState(piso);
  const [cpCliente, setCpCliente] = useState(cp);
  const [successMessage, setSuccessMessage] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [cpError, setCpError] = useState('');
  const [pisoError, setPisoError] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [calleError, setCalleError] = useState('');
  const [markers, setMarkers] = useState([]);
  const [SelectedLongitud, setSelectedLongitud] = useState(longitud|| '-34.61315');
  const [SelectedLatitud, setSelectedLatitud] = useState(latitud|| '-58.37723');
  const [initialMarker, setInitialMarker] = useState([latitud || '-34.61315', longitud || '-58.37723']);
  const [LongitudError, setLongitudError] = useState(null);
  

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);

  //IMPORTO LA FUNCIONALIDAD DE LA VETERINARIA
  const { updateVeterinaria } = useVeterinarias();
  
  useEffect(() => {
    // Habilitar el botón GUARDAR cuando todas las condiciones son verdaderas
    if (
      razonSocialVET.length > 2 &&
      isPaisId !== null && isPaisId !== '' &&
      isProvinciaId !== null && isProvinciaId !== '' &&
      isCiudadId !== null && isCiudadId !== ''  &&
      !telefonoError &&
      !cpError &&
      !cuitError &&
      !numeroError &&
      !calleError &&
      !LongitudError

    ) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [razonSocialVET, isPaisId, isProvinciaId, isCiudadId, telefonoError, cpError, cuitError, pisoError, numeroError, calleError, LongitudError]);
  
  let imageSource = null;
    imageSource = clienteImage;

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const ClickHandler = ({ onMarkerClick }) => {
    const map = useMapEvents({
      click: (e) => {
        // Obtén las coordenadas del clic
        const latlng = e.latlng;
        // Llama a la función para agregar el marcador
        onMarkerClick(latlng);
        // Actualiza las variables de estado SelectedLongitud y SelectedLatitud
        setSelectedLongitud(latlng.lng.toString());
        setSelectedLatitud(latlng.lat.toString());
        setLongitudError(null);
      
      },
    });
  
    return null;
  };

  const addMarker = (latlng) => {
    // Si ya hay un marcador, elimínalo
    if (markers.length > 0) {
      setMarkers([latlng]); // Reemplazar el marcador anterior con el nuevo
    } else {
      // No hay marcadores previos, simplemente agrega el nuevo
      setMarkers([...markers, latlng]);
    }
  };

  const enableSaveButton = () => {
    setIsSaveButtonDisabled(false);
  };

  const [, navigate] = useLocation();

  const handleGuardarClick = () => {

    // Verificar que la Razon Social tenga más de 2 letras
    const nombreValido = razonSocialVET.length > 2 && razonSocialVET.length < 50;
    
    // Verificar el teléfono
    if (!telefonoCliente) {
      setTelefonoError('El teléfono no puede estar vacío');
      return; // No continuar con la actualización
    } else if (telefonoCliente.length > 20) {
      setTelefonoError('Hasta 20 caracteres permitidos en el teléfono');
      return; // No continuar con la actualización
    } else {
      setTelefonoError('');
    }

    // Verificar el cp
    if (!cpCliente) {
      setCpError('El CP no puede estar vacío');
      return; // No continuar con la actualización
    } else if (cpCliente.length > 10) {
      setCpError('Hasta 10 caracteres permitidos en el CP');
      return; // No continuar con la actualización
    } else {
      setCpError('');
    }

    // Verificar el CUIT
      if (!cuitVET) {
        setCuitError('El CUIT no puede estar vacío');
        return; // No continuar con la actualización
      } else if (cuitVET.length > 20) {
        setCuitError('Hasta 20 caracteres permitidos en el CUIT');          
        return; // No continuar con la actualización
      } else {
        setCuitError(''); 
        }    

    // Verificar el PISO
    if (pisoCliente && pisoCliente.length > 10) {
      setPisoError('Hasta 10 caracteres permitidos en el Piso');          
      return; // No continuar con la actualización
    } else {
      setPisoError(''); 
      }    

    // Verificar el Numero
    if (!numeroCliente) {
      setNumeroError('El Numero no puede estar vacío');
      return; // No continuar con la actualización
    } else if (numeroCliente.length > 10) {
      setNumeroError('Hasta 10 caracteres permitidos en el Número');          
      return; // No continuar con la actualización
    } else {
      setNumeroError(''); 
      }    
 
    // Verificar la Calle
    if (!calleCliente) {
      setCalleError('La calle no puede estar vacía');
      return; // No continuar con la actualización
    } else if (calleCliente.length > 100) {
      setCalleError('Hasta 100 caracteres permitidos en la Calle');          
      return; // No continuar con la actualización
    } else {
      setCalleError(''); 
      }  

          // Verificar las Coordenadas
    if (!SelectedLongitud) {
      setLongitudError('Debe marcar la posición de la Veterinaria en el Mapa');
      return; // No continuar con la actualización
    } else {
      setLongitudError(''); 
      } 


    // Verificar que el Razon Social tenga más de 2 letras
    if (nombreValido && isPaisId !== null && isProvinciaId !== null && isCiudadId !== null && SelectedLongitud !==null)   {

      // Crear un nuevo objeto oNuevaVeterinaria con los datos necesarios
      const fechaActual = new Date();

      const oNuevoVeterinaria = {
        id:id,
        razonsocial: razonSocialVET,
        cuit:cuitVET,

        calle:calleCliente,
        numero:numeroCliente,
        piso:pisoCliente,
        cp:cpCliente,
        id_Pais: isPaisId,
        id_Provincia: isProvinciaId,
        id_Ciudad: isCiudadId,
        telefono_Part:telefonoCliente,
        id_usuario: GLOBALVetly.id,
        auD_FechaCreate: fechaCreacion,
        auD_FechaModify: fechaActual,
        coordenadaX: SelectedLatitud,
        coordenadaY:SelectedLongitud
      };


      // Llamar a la función para ACTUALIZAR LA VETERINARIA
      updateVeterinaria(GLOBALVetly.id, oNuevoVeterinaria, GLOBALVetly.token);
      
      // Cerrar el modal y limpiar el nombre
      setModalIsOpen(false);
      setRazonSocialVET('');

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Datos de la Veterinaria Actualizada exitosamente');

      setTimeout(() => {
        setSuccessMessage('');
        // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
        navigate('/');
      }, 1000);

      

    }
  };



    return (
    <div className="card shadow-lg" style={{ width: '32rem', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={imageSource} alt="Cliente" className="img-fluid" />
          <button className="btn btn-primary mt-2" onClick={() => setModalIsOpen(true)}>Editar</button>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title"><strong>{razonSocial}</strong></h5>
            <p className="card-text">Legajo #<strong>{id}</strong></p>
            <p className="card-text">CUIT: <strong>{cuitVET}</strong></p>
            <p className="card-text">Calle: <strong>{calle}</strong> N°:<strong>{numero}</strong> Piso:<strong>{piso}</strong>   </p>
            <p className="card-text">CP: <strong>{cp}</strong>  - Telefono: <strong>{telefono}</strong>   </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Cliente"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            width: '50%', // Ajusta el ancho según tus necesidade
            margin: '0 auto',
          },
        }}
      >

<div class="modal-content-CardVete">
  <div class="left-column-CardVete">
    

        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
              Razón Social
            </label>
            <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="razonSocial"
            defaultValue={razonSocialVET}
            onChange={(e) => setRazonSocialVET(e.target.value)}
          />
          </div>
          <div className="w-1/3">
            <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">
              CUIT
            </label>
            <input
            type="text"
            id="cuit"
            name="cuit"
            className={`mt-1 p-2 border rounded-md w-full ${
              cuitError ? 'border-red-500' : ''
            }`}
            placeholder="CUIT"
            defaultValue={cuit}
            onChange={(e) => {
              setCuitVET(e.target.value);
              setCuitError(''); // Limpiar mensaje de error al editar el teléfono
            }}
          />
          {cuitError && (
            <p className="text-red-500 text-xs mt-2">{cuitError}</p>
          )}
            </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
              País
            </label>
            <select
              id="pais"
              name="pais"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setIsPaisId(e.target.value)}
              value={isPaisId || ''} // Asignamos un valor por defecto vacío si idPais es null
            >
              <option value="">Seleccione País</option> {/* Agregamos la opción por defecto */}
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.pais}
                </option>
              ))}
                </select>
          </div>
          <div className="w-1/3 pr-2">
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <select
              id="provincia"
              name="provincia"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setIsProvinciaId(e.target.value)}
              value={isProvinciaId || ''}
            >
              <option value="">Seleccione Provincia</option> {/* Agregamos la opción por defecto */}
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.provincia}
                </option>
                ))}
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <select
              id="ciudad"
              name="ciudad"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setIsCiudadId(e.target.value)}
              value={isCiudadId || ''}
            >
              <option value="">Seleccione Ciudad</option> {/* Agregamos la opción por defecto */}
                   {ciudades.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.id}>
                      {ciudad.ciudad}
                    </option>
                  ))}
                </select>
            </div>
        </div>
        {/* Agregamos los nuevos elementos aquí CALLE PISO y NUMERO */}
        
        
        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="calle" className="block text-sm font-medium text-gray-700">
              Calle
            </label>
            <input
            type="text"
            id="calle"
            name="calle"
            className={`mt-1 p-2 border rounded-md w-full ${
              calleError ? 'border-red-500' : ''
            }`}
            placeholder="Calle"
            defaultValue={calle}
            onChange={(e) => {
              setCalleCliente(e.target.value);
              setCalleError(''); 
            }}
          />
          {calleError && (
            <p className="text-red-500 text-xs mt-2">{calleError}</p>
          )}
          </div>
          <div className="w-1/3 pr-2">
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
              Número
            </label>
            <input
            type="text"
            id="Número"
            name="numero"
            className={`mt-1 p-2 border rounded-md w-full ${
              numeroError ? 'border-red-500' : ''
            }`}
            placeholder="Número"
            defaultValue={numero}
            onChange={(e) => {
              setNumeroCliente(e.target.value);
              setNumeroError('');
            }}
          />
          {numeroError && (
            <p className="text-red-500 text-xs mt-2">{numeroError}</p>
          )}
          </div>
          <div className="w-1/3">
              <label htmlFor="piso" className="block text-sm font-medium text-gray-700">
                Piso
              </label>
              <input
                type="text"
                id="piso"
                name="piso"
                className={`mt-1 p-2 border rounded-md w-full ${
                  pisoError ? 'border-red-500' : ''
                }`}
                placeholder="Escribe el Piso aquí"
                defaultValue={piso}
                onChange={(e) => {
                  setPisoCliente(e.target.value);
                  setPisoError(''); // Limpiar mensaje de error al editar el teléfono
                }}
              />
              {pisoError && (
                <p className="text-red-500 text-xs mt-2">{pisoError}</p>
              )} 
            

            </div>
        </div>

        
        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="cp" className="block text-sm font-medium text-gray-700">
              CP
            </label>
            <input
            type="text"
            id="cp"
            name="cp"
            className={`mt-1 p-2 border rounded-md w-full ${
              cpError ? 'border-red-500' : ''
            }`}
            placeholder="Calle"
            defaultValue={cp}
            onChange={(e) => {
              setCpCliente(e.target.value);
              setCpError(''); // Limpiar mensaje de error al editar el teléfono
            }}
          />
          {cpError && (
            <p className="text-red-500 text-xs mt-2">{cpError}</p>
          )}

          </div>
          <div className="w-1/3 pr-2">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                className={`mt-1 p-2 border rounded-md w-full ${
                  telefonoError ? 'border-red-500' : ''
                }`}
                placeholder="Escribe el Teléfono aquí"
                defaultValue={telefono}
                onChange={(e) => {
                  setTelefonoCliente(e.target.value);
                  setTelefonoError(''); // Limpiar mensaje de error al editar el teléfono
                }}
              />
              {telefonoError && (
                <p className="text-red-500 text-xs mt-2">{telefonoError}</p>
              )}

              </div>

        </div>
        
        <div className="flex justify-end mt-4">
             <button className="btn btn-secondary mr-2" onClick={closeModal}>
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

        </div>
  <div class="right-column-CardVete">
          <p/><p/><p/>
          <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
              Marque las coordenadas de la Veterinaria:
            </label>
            <p/>
          <MapContainer center={initialMarker} zoom={13} style={{ height: '300px', width: '100%' }} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={initialMarker}>
                <Popup>Coordenadas de Veterinaria registradas anteriormente</Popup>
            </Marker>
            {/* Renderiza los marcadores existentes */}
            {markers.map((marker, index) => (
              <Marker key={index} position={marker}>
                <Popup>Nueva Dirección de la Veterinaria</Popup>
              </Marker>
            ))}
            {/* Agrega la capacidad de hacer clic en el mapa para agregar marcadores */}
            <ClickHandler onMarkerClick={addMarker}       
            setSelectedLongitud={setSelectedLongitud}
            setSelectedLatitud={setSelectedLatitud}
          />
          </MapContainer>
      </div>  
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

export default PerfilVeterinariaCard;;


