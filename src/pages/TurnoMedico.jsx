import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '../contexts/User';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TurnoProfesionalesCard from '../components/Cards/TurnoProfesionalesCard';
import TurnoVeterinariasCard from '../components/Cards/TurnoVeterinariasCard';
import { useProfesionalesTarifa } from '../hooks/useProfesionalesTarifa';
import { useMascotas } from '../hooks/useMascotas';
import { useVeterinarias } from '../hooks/useVeterinarias';
import { useEspecialidad } from '../hooks/useEspecialidad';
import { usePerfil } from '../hooks/usePerfil';  // Para levantar el ID CLIENTE
import { useTurno} from '../hooks/useTurno'; 
import { addMinutes } from 'date-fns'; // para exlcluir fechas del DatePicker
import { format } from "date-fns-tz";


export default function TurnoMedico() {
  const { isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const welcomeText = 'TURNO MÉDICO';
  const [, navigate] = useLocation();

  // Estado para controlar la página actual del formulario
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedPetId, setSelectedPetId] = useState(-1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedVeterinary, setSelectedVeterinary] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRate, setSelectedRate] = useState('');
  const [markerCoordinates, setMarkerCoordinates] = useState([51.505, -0.09]);
  const [selectedVeterinariaId, setSelectedVeterinariaId] = useState(-1);
  const [selectedProfessionalTarifa, setSelectedProfessionalTarifa] = useState('');
  const [selectedMotivo, setSelectedMotivo] = useState('');
  const [selectedClienteId, setSelectedClientelId] = useState(-1);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedEmailProfesional, setSelectedEmailProfesional] = useState('');
  const [turnosReservados, setTurnosReservados] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [SelectedApellidoProfesional, setSelectedApellidoProfesional] = useState('');
  const [selectedMarcador, setSelectedMarcador] = useState('');
  

//  const { agregarTurno, actualizarTurnos} = useTurno();

  // PASO 1: CARGAS LAS MASCOTAS DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);
  const { mascotas } = useMascotas(GLOBALVetly.email, GLOBALVetly.token);
  const [mascotasLoaded, setMascotasLoaded] = useState(false);

  if (!mascotasLoaded) {
    // Llamar a la función o cargar las mascotas aquí solo si aún no se han cargado
    // Esto se ejecutará solo una vez al cargar la página
    setMascotasLoaded(true);
  }
//-----------------------------------------------------------------------------------------------
    // PASO 1.1: CARGAR EL CLIENTE
    const { perfil } = usePerfil(GLOBALVetly.id, GLOBALVetly.type);
    //setSelectedClientelId(perfil[0].id);
  //-----------------------------------------------------------------------------------------------
  // PASO 2: CARGAS LAS ESPECIALIDADES SOLO UNA VEZ AL CARGAR LA PÁGINA
  const { especialidad } = useEspecialidad();
  const [especialidadesLoaded, setEspecialidadesLoaded] = useState(false);

  useEffect(() => {
    if (!especialidadesLoaded) {
      // Llamar a la función para cargar las especialidades solo si aún no se han cargado
      // Este efecto se ejecutará solo una vez al cargar la página
      setEspecialidadesLoaded(true);
    }
  }, [especialidadesLoaded, especialidad]);

  //-----------------------------------------------------------------------------------------------
  // PASO 3: CARGAR LAS VETERINARIAS - Cargar solo una vez al cargar la página
  const { veterinarias } = useVeterinarias();
  const [veterinariasLoaded, setVeterinariasLoaded] = useState(false);
  
  useEffect(() => {
    if (!veterinariasLoaded) {
      // Llamar a la función para cargar las veterinarias solo si aún no se han cargado
      // Este efecto se ejecutará solo una vez al cargar la página
      setVeterinariasLoaded(true);
    }
  }, [veterinariasLoaded, veterinarias]);

  
  function handleSelectVeterinaria(veterinaria) {
    setSelectedVeterinariaId(veterinaria.id);
    setSelectedVeterinary(veterinaria.razonSocial);
   
  }

  //-----------------------------------------------------------------------------------------------
  // PASO 4_ CARGAR LOS PROFESIONALES DE LA VETERINARIA LOGUEADA-----------------------------------

  const { profesionales, actualizarProfesionales } = useProfesionalesTarifa(selectedVeterinariaId);

  // Declarar filteredVeterinarias aquí para que esté disponible en todo el alcance
  const [filteredVeterinarias, setFilteredVeterinarias] = useState(veterinarias);

  // Efecto para actualizar profesionales cuando selectedVeterinariaId cambie
  useEffect(() => {
    if (selectedVeterinariaId !== -1) {
      actualizarProfesionales(selectedVeterinariaId);
    }
  }, [selectedVeterinariaId]);

 // PASO 5 CARGAR LA AGENDA DE LOS PROFESIONALES

 const { turnos, actualizarTurnos, agregarTurno } = useTurno(selectedProfessional);

 useEffect(() => {
  if (selectedProfessional !== '') {
    actualizarTurnos(selectedProfessional);
  }
}, [selectedProfessional]);


const getExcludedTimes = () => {
  const excludedTimes = turnos.map((turno) => {
    const fechaAtencion = new Date(turno.fecha_atencion_inicio); // Convertir la cadena de fecha a un objeto Date
    const hora = fechaAtencion.getHours();
    const minutos = fechaAtencion.getMinutes();
    return addMinutes(new Date(), hora * 60 + minutos);
  });

  return excludedTimes;
};

const isTimeTaken = (date) => {
  const dateTime = date.getTime(); // Convierte la fecha a milisegundos para una comparación más sencilla
  return turnos.some((turno) => {
    const fechaAtencion = new Date(turno.fecha_atencion_inicio).getTime();
    return dateTime === fechaAtencion;
  });
};

  const handleNext = () => {
    
    setCurrentPage(currentPage + 1);

  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };


  const handleFinish = () => {
    // Realizar acciones de finalización aquí, como enviar los datos al servidor

    const selectedTimeIsTaken = isTimeTaken(selectedDate);

    if (selectedTimeIsTaken) {
      setShowAlert(true);
    } else {

        const timeZone = "America/Argentina/Buenos_Aires";
        const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone });

        const oNuevoTurno = {
          id_veterinaria_profesional:selectedVeterinariaId, // Envío la Veterinaria La capa de Negocio resuelve la relación
          id_cliente_mascota:perfil[0].id, // Envío el Cliente. La capa de Negocio resuelve la relación
          id_Tipo_Consulta: selectedSpecialty,
          id_estado_consulta : 1, //ESTADO PENDIENTE
          id_profesional_tarifa:selectedProfessional, // Envio el Profesional. La capa de Negocio resuelve la relación
          id_pago_consulta : 0, // Es necesario Buscarla desde NEGOCIO
          fecha_atencion_inicio: formattedDate,
          motivo_consulta_abrev:selectedMotivo,
        };

        // Llamar a la función para agregar el Turno
          agregarTurno(GLOBALVetly.id,selectedPetId, oNuevoTurno, GLOBALVetly.token);

          // Mostrar el mensaje de éxito durante 1 segundo
          setSuccessMessage('Turno creado exitosamente');

          setTimeout(() => {
          setSuccessMessage('');
          // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
                  navigate('/');
          }, 1000);
    }
  };

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

  const isNextDisabled = currentPage === 1 && !selectedPet;
  const isFinishDisabled = currentPage !== 5 && (!selectedPet || !selectedSpecialty);

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/turno_medico'>
        <div className='w-full'>
          <h2 className='text-center text-xl font-bold py-10 md:text-3xl'>{welcomeText}</h2>

          <div className='flex'>
            {/* Columna 1: Contenido principal */}
            <div style={{ flex: '1', marginRight: '20px' }}>
              {currentPage === 1 && (
                <div>
                  {/* Barra de progreso */}
                  <div className='progress' style={{ height: '20px' }}>
                    <div className='progress-bar' role='progressbar' style={{ width: '20%' }} aria-valuenow='40' aria-valuemin='0' aria-valuemax='100'></div>
                  </div>

                  {/* Línea de separación */}
                  <hr />

                  <h3 className='text-lg font-semibold mb-2'>Seleccione al Paciente:</h3>

                  {/* Dropdown select con las mascotas */}
                  <select
                    value={selectedPet}
                    onChange={(e) => {
                      setSelectedPet(e.target.value);
                      const petId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                      setSelectedPetId(petId); // Guardar el ID de la mascota seleccionada
                    }}
                    className='form-select mb-2'
                  >
                    <option value=''>Seleccionar paciente-------------------</option>
                    {mascotas.map((mascota) => (
                      <option key={mascota.id} value={mascota.nombreMascota} data-id={mascota.id}>
                        {mascota.nombreMascota}
                      </option>
                    ))}
                  </select>

                  {/* Botón Siguiente debajo del dropdown y al extremo derecho */}
                  <div className='flex justify-end mt-2'>
                    <button onClick={handleNext} className='btn btn-primary' disabled={isNextDisabled}>
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div>
                  {/* Barra de progreso */}
                  <div className='progress' style={{ height: '20px' }}>
                    <div className='progress-bar' role='progressbar' style={{ width: '40%' }} aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>
                  </div>

                  {/* Línea de separación */}
                  <hr />

                  <h3 className='text-lg font-semibold mb-2'>Seleccione la Especialidad:</h3>
                  {/* Dropdown select con las especialidades */}
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className='form-select mb-2'
                  >
                    <option value=''>Seleccionar especialidad-----------------</option>
                    {especialidad.map((esp) => (
                      <option key={esp.id} value={esp.id}>
                        {esp.tipo_consulta}
                      </option>
                    ))}
                  </select>

                  <h3 className='text-lg font-semibold mb-2'>Ingrese el motivo de consulta:</h3>
                  <div className="relative">
                      <input
                        type="text"
                        id="InputMotivoConsulta"
                        value={selectedMotivo}
                        onChange={(e) => setSelectedMotivo(e.target.value)}
                        className='form-input w-full md:w-2/3 border p-2 mb-2'
                      />
                  </div>
                  
                  {/* Etiqueta para indicar la cantidad mínima de caracteres */}
                  {selectedMotivo.length < 10 && (
                    <p className="text-sm text-red-500">Ingrese al menos 10 caracteres.</p>
                  )}
                  
                  {/* Botones en el extremo izquierdo y derecho */}
                  <div className='flex justify-between mt-2'>
                    <button onClick={handlePrev} className='btn btn-secondary'>
                      Atrás
                    </button>
                    <button onClick={handleNext} className='btn btn-primary' disabled={!selectedSpecialty|| selectedMotivo.length < 10}>
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div>
                  {/* Barra de progreso */}
                  <div className='progress' style={{ height: '20px' }}>
                    <div className='progress-bar' role='progressbar' style={{ width: '60%' }} aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'></div>
                  </div>
              
                  {/* Línea de separación */}
                  <hr />
              
                  <h3 className='text-lg font-semibold mb-2'>Buscar Veterinaria por Nombre:</h3>
              
                  {/* Campo de búsqueda de veterinarias por nombre */}
                  <div className="mb-2 flex border rounded border-gray-300">
                    <input
                      type="text"
                      placeholder="Buscar veterinaria por nombre..."
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
                    <p className="text-sm text-gray-500">{filteredVeterinarias.length} coincidencias</p>
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
                        onCardSelect={(id) => {setSelectedVeterinariaId(id); setSelectedVeterinary(veterinaria.razonSocial)} }
                      />
                    ))}
                  </div>
              
                  {/* Mapa */}
                  <MapContainer center={[-34.6118, -58.4173]} zoom={13} style={{ height: '300px', width: '100%' }}>
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
                            }>Seleccionar</button>
                    </div>
                  </Popup>
                  </Marker>                  
                    ))}


                  </MapContainer>

              
                  {/* Botones en el extremo izquierdo y derecho */}
                  <div className='flex justify-between mt-2'>
                    <button onClick={handlePrev} className='btn btn-secondary'>
                      Atrás
                    </button>
                    <button onClick={handleNext} className='btn btn-primary' disabled={selectedVeterinariaId === -1}>
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {/* Formulario 4: Mostrar tarjetas de profesionales */}
              {currentPage === 4 && (
                <div>
                  {/* Barra de progreso */}
                  <div className='progress' style={{ height: '20px' }}>
                    <div className='progress-bar' role='progressbar' style={{ width: '80%' }} aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'></div>
                  </div>

                  {/* Línea de separación */}
                  <hr />

                  <h3 className='text-lg font-semibold mb-2'>Seleccione un Profesional:</h3>

                  {/* Cargar tarjetas de profesionales */}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {profesionales.map((profesional) => (
                      <TurnoProfesionalesCard
                        key={profesional.id_Profesional}
                        id={profesional.id_Profesional}
                        nombre={profesional.nombre}
                        apellido={profesional.apellido}
                        matricula={profesional.matricula}
                        dni={profesional.dni}
                        tarifa={profesional.tarifa}
                        selectedId={selectedProfessional}
                        onCardSelect={(id) => {
                          setSelectedProfessional(id);
                          setSelectedProfessionalTarifa(profesional.tarifa); // Actualiza la tarifa del profesional seleccionado
                          setSelectedEmailProfesional(profesional.email_Profesional);
                          setSelectedApellidoProfesional(profesional.apellido);
                        }}
                      />
                    ))}
                  </div>

                  {/* Botones en el extremo izquierdo y derecho */}
                  <div className='flex justify-between mt-2'>
                    <button onClick={handlePrev} className='btn btn-secondary'>
                      Atrás
                    </button>
                    <button onClick={handleNext} className='btn btn-primary' disabled={selectedProfessional === -1}>
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {/* Formulario 5: Seleccionar fecha y hora */}
              {currentPage === 5 && (
                <div>
                  {/* Barra de progreso */}
                  <div className='progress' style={{ height: '20px' }}>
                    <div className='progress-bar' role='progressbar' style={{ width: '100%' }} aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'></div>
                  </div>

                  {/* Línea de separación */}
                  <hr />

                  <h3 className='text-lg font-semibold mb-2'>Seleccionar Fecha y Hora:</h3>

                  {/* Contenedor con borde y botón de lupa */}
                  <div style={{ border: '2px solid #ccc', borderRadius: '4px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => {/* Aquí puedes agregar la lógica para abrir el DatePicker */}} />
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="Hora"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}  // Establecer la fecha mínima como el día actual
                      minTime={new Date().setHours(8, 0)} // Establecer la hora mínima a las 08:00 am
                      maxTime={new Date().setHours(20, 0)} // Establecer la hora máxima a las 20:00 pm
                      excludeTimes={getExcludedTimes()}  //Excluir los turnos ya tomados
                      placeholderText='Seleccione una fecha y hora'
                      // Utiliza timeClassName para aplicar el estilo rojo a los horarios tomados
                      timeClassName={(date) => (isTimeTaken(date) ? 'text-white bg-red-500' : '')}
                    />
                  </div>

                  {/* Mostrar la alerta */}
                  {showAlert && (
                    <div className="alert alert-danger">
                      Horario no disponible. Por favor, seleccione otro horario.
                    </div>
                  )}
                  
                  {/* Botones en el extremo izquierdo y derecho */}
                  <div className='flex justify-between mt-2'>
                    <button onClick={handlePrev} className='btn btn-secondary'>
                      Atrás
                    </button>
                    <button onClick={handleFinish} className='btn btn-success' disabled={!selectedDate}>
                      Finalizar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Columna 2: Tarjeta en el lado derecho */}
            <div style={{ flex: '0 0 14rem' }}>
              <div className='card'>
                <div className='card-header'>
                  Resumen
                </div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Paciente: {selectedPet}</li>
                  <li className='list-group-item'>Especialidad: {selectedSpecialty}</li>
                  <li className='list-group-item'>Veterinaria: {selectedVeterinary}</li>
                  <li className='list-group-item'>Profesional: {SelectedApellidoProfesional}</li>
                  <li className='list-group-item'>Fecha: {selectedDate ? selectedDate.toLocaleString() : 'N/A'}</li>
                  <li className='list-group-item'>Tarifa: ${selectedProfessionalTarifa}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      </Route>
    </section>
  );
}
