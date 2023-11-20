import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '../contexts/User';
import Calendar from 'react-calendar';
import '../style/grillas.css'
import ReactPaginate from 'react-paginate';
import { useCalendarioDiagnostico } from '../hooks/useCalendarioDiagnostico';
import { useVeterinariaProfesional } from '../hooks/useVeterinariaProfesional';
import { useDiagnostico } from '../hooks/useDiagnosticoProfesional';


import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Calendario() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const [formattedDate, setFormattedDate] = useState(null); // Estado para la fecha
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada en el calendario
  const [initialDateSet, setInitialDateSet] = useState(false); // Estado para controlar si la fecha inicial se ha configurado
  const [selectedVeterinaria, setSelectedVeterinaria] = useState(""); // Estado para la veterinaria seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [nombreMascota, setNombreMascota] = useState('');
  const [especieMascota, setEspecie] = useState('');
  const [razaMascota, setRaza] = useState('');
  const [sexoMascota, setSexo] = useState('');
  const [castradoMascota, setCastrado] = useState('');
  const [edadMascota, setEdad] = useState('');
  const [motivoConsultaMascota, setMotivoConsulta] = useState('');
  const [diagnosticoMascota, setDiagnostico] = useState('');
  const [urlMeet, setURLMeet] = useState('');
  const [idConsulta, setIDConsulta] = useState('');
  const [idDiagnos, setIDDiagnostico] = useState('');
  const [diagnosticoError, setDiagnosticoError] = useState('');

  const [, navigate] = useLocation();

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
  const { GLOBALVetly } = useContext(UserContext);
  const { agregarDiagnostico, updateDiagnostico } = useDiagnostico();

  // CARGAR LAS VETERINARIAS DEL PROFESIONAL----------------------------------------------
  const { veterinariasProf } = useVeterinariaProfesional(GLOBALVetly.id);


  // CARGAR CALENDARIO DEL PROFESIONAL----------------------------------------------------
  // Obtener el día de hoy en el formato entero YYYYMMDD
  
  const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const initialFormattedDate = parseInt(`${year}${month}${day}`)

    
  const { calendario, actualizarCalendario } = useCalendarioDiagnostico(GLOBALVetly.id, formattedDate || initialFormattedDate);

    // Efecto para actualizar profesionales cuando selectedVeterinariaId cambie
    useEffect(() => {
        if (formattedDate !== null) {
          actualizarCalendario(GLOBALVetly.id, formattedDate);
        }
      }, [formattedDate]);
  
  //--------------------------------------------------------------------------------------
  const itemsPerPage = 10; // Cantidad de registros por página
  // Estado para almacenar los datos de la tabla y la dirección de ordenamiento
  const [currentPage, setCurrentPage] = useState(0);

  
  //-----------------------------------------------------------------------------------------
  useEffect(() => {
    // Puedes cargar tus datos de la API o fuente de datos aquí
  }, []);

  const pageCount = Math.ceil(calendario.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentData = calendario.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  

  // FILTRAR POR VETERINARIA
  const filteredCalendario = selectedVeterinaria
  ? calendario.filter((item) => selectedVeterinaria.includes(item.id_Veterinaria))
  : calendario;


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    
    // Calcula la diferencia en milisegundos
    const diferencia = hoy - fechaNacimientoDate;
    
    // Convierte la diferencia a meses y años
    const meses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30.4375)); // Aproximadamente el promedio de días por mes
    const years = Math.floor(meses / 12);
    const remainingMonths = meses % 12;
    
    if (years > 0) {
      if (remainingMonths > 0) {
        return `${years} años y ${remainingMonths} meses`;
      } else {
        return `${years} años`;
      }
    } else {
      return `${remainingMonths} meses`;
    }
  }
  
  const openUrlInNewTab = () => {
    window.open(urlMeet, '_blank');
  };

  const handleCancelarClick = () => {
    closeModal(); // Cierra el modal
  };

  // Agrega una función que maneje cambios en el control de diagnóstico
const handleDiagnosticoChange = (e) => {
  const value = e.target.value;
  setDiagnostico(value);

  // Valida si el diagnóstico supera los 1900 caracteres y actualiza el estado
  if (value.length > 1900) {
    setDiagnosticoError("El diagnóstico no puede superar los 1900 caracteres");
  } else {
    setDiagnosticoError(""); // Limpia el mensaje de error si no se supera la longitud
  }
};
  
  const handleGuardarClick = () => {

    // Crear un nuevo objeto oNuevoDiagnostico con los datos necesarios
    
    const oNuevoDiagnostico = {
      id_ConsultaProfesional: idConsulta,
      detalleDiagnostico: diagnosticoMascota,
    };

    const oModificadoDiagnostico = {
      id:idDiagnos,
      id_ConsultaProfesional: idConsulta,
      detalleDiagnostico: diagnosticoMascota,

    };
    

    if (idDiagnos === '' || idDiagnos === null) {
      // Llamar a la función para agregar Diagnostico
      agregarDiagnostico(GLOBALVetly.id, oNuevoDiagnostico);
    } else {

      // Llamar a la función para actualizar Diagnostico
      updateDiagnostico(GLOBALVetly.id, oModificadoDiagnostico);
    }

    closeModal(); // Cierra el modal

    // Mostrar el mensaje de éxito durante 1 segundo
    setSuccessMessage('Diagnóstico actualizado exitosamente');
    setTimeout(() => {
      setSuccessMessage('');
      
      // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
      navigate('/');
    }, 1000);

  };

  
  // Define la función diagnosticar
  const diagnosticar = (item) => {
    setNombreMascota(item.nombreMascota);
    setEspecie(item.especie);
    setRaza(item.raza);
    setSexo(item.sexo);
    setCastrado(item.castrado);
    const edadMascota = calcularEdad(item.fecha_Nacimiento);
    setEdad(edadMascota);
    setDiagnostico(item.detalleDiagnostico);
    setMotivoConsulta(item.motivo_consulta_abrev);
    setURLMeet(item.url_invitacion);
    setIDConsulta(item.id);
    setIDDiagnostico(item.idDIagnostico);
    
    openModal();
  };

  return (
    <section className="flex flex-row h-full">
      <CategoriesSideBar categories={categories} />
      <Route path="/calendario">
        <div className="flex flex-row h-full">
          <div className="w-41 p-3">
            <Calendar className="scaled-calendar" value={selectedDate}
                onChange={date => {
                    setSelectedDate(date); // Actualizar la fecha seleccionada
                    // Aquí puedes formatear 'date' en YYYYMMDD y actualizar formattedDate
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const formatted = `${year}${month}${day}`;
                    setFormattedDate(formatted);

                }}
                
                />
          </div>
          <div className="w-55">
            <div className="flex flex-col h-full">
            <div className="p-3">
                <div>
                    <label style={{ marginBottom: '10px' }}>Seleccione alguna de sus Veterinarias:</label>
                </div>
                <div>
                    <select
                      className="form-select"
                      value={selectedVeterinaria}
                      onChange={(e) => setSelectedVeterinaria(e.target.value)}
                    >
                      <option value="">Todas sus Veterinarias</option>
                      {veterinariasProf.map((veterinaria) => (
                        <option key={veterinaria.id_Veterinaria} value={veterinaria.id_Veterinaria}>
                          {veterinaria.razonSocial}
                        </option>
                      ))}
                    </select>

                </div>

            </div>


              <div className="p-4" style={{ height: '30%' }}>
                
              <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th
                        className="sortable-header"
                      >
                        Razón Social
                        </th>
                      <th
                        className="sortable-header"
                        >
                        Hora Atención
                        </th>                 
                      <th
                        className="sortable-header"
                      >
                        Cliente
                      </th>
                      <th
                        className="sortable-header"
                      >
                        Mascota
                      </th>
                      <th
                        className="sortable-header"
                      >
                        Teléfono
                      </th>
                      <th>
                        ESTADO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCalendario.map((item, index) => (

                      <tr key={index}>
                        <td>{item.razonSocial}</td>
                        <td>{formatDate(item.fecha_atencion_inicio)}</td>
                        <td>{item.apellido}, {item.nombre}</td>
                        <td>{item.nombreMascota}</td>
                        <td>{item.telefono}</td>

                        <td>
                            {item.estado_consulta === 'PENDIENTE' ? (
                              <button className="btn btn-success" 
                                  onClick={() => diagnosticar(item)}
                              >
                                DIAGNÓSTICO PENDIENTE
                              </button>
                            ) : item.estado_consulta === 'CONCRETADA' ? (
                              <button className="btn btn-secondary" 
                                  onClick={() => diagnosticar(item)}>
                                DIAGNOSTICO REALIZADO
                              </button>
                            ) : (
                              item.estado_consulta
                            )}
                          </td>


                      </tr>

))}
                  </tbody>
                </table>
                    <div className="pagination">
                            <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination-container'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            />
                    </div>

              </div>
            </div>
          </div>
        </div>
      </Route>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
      <div className="flex justify-end">
        <button className="close-button" onClick={closeModal}>
          {/* Aquí puedes agregar una cruz o un icono de cierre */}
          <span>✖️</span>
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">Diagnosticar Mascota</h2>
      <div className="mb-4">
        <div className="flex">
          <div className="w-1/3 pr-3">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-1 p-2 border rounded-md w-full"
              value={nombreMascota}
              readOnly
            />
          </div>
          <div className="w-1/3 pl-3">
            <label htmlFor="especie" className="block text-sm font-medium text-gray-700">
              Especie
            </label>
            <input
              type="text"
              id="especie"
              name="especie"
              className="mt-1 p-2 border rounded-md w-full"
              value={especieMascota}
              readOnly
            />
          </div>
          <div className="w-1/3 pl-3">
            <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
              Raza
            </label>
            <input
              type="text"
              id="raza"
              name="raza"
              className="mt-1 p-2 border rounded-md w-full"
              value={razaMascota}
              readOnly
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 pr-3">
            <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
              Sexo
            </label>
            <input
              type="text"
              id="sexo"
              name="sexo"
              className="mt-1 p-2 border rounded-md w-full"
              value={sexoMascota}
              readOnly
            />
          </div>
          <div className="w-1/3 pl-3">
            <label htmlFor="castrado" className="block text-sm font-medium text-gray-700">
              Castrado
            </label>
            <input
              type="text"
              id="castrado"
              name="castrado"
              className="mt-1 p-2 border rounded-md w-full"
              value={castradoMascota}
              readOnly
            />
          </div>
          <div className="w-1/3 pl-3">
            <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="text"
              id="edad"
              name="edad"
              className="mt-1 p-2 border rounded-md w-full"
              value={edadMascota}
              readOnly
            />
          </div>
        </div>


        <div className="w-full mt-4">
          <label htmlFor="motivoConsulta" className="block text-sm font-medium text-gray-700">
            Motivo de Consulta
          </label>
          <textarea
            id="motivoConsulta"
            name="motivoConsulta"
            className="mt-1 p-2 border rounded-md w-full"
            value={motivoConsultaMascota}
            readOnly
          />
        </div>

        <div className="w-full mt-4">
          <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700">
            Diagnóstico
          </label>
          <textarea
            id="diagnostico"
            name="diagnostico"
            className="mt-1 p-2 border rounded-md w-full"
            value={diagnosticoMascota}
            onChange={handleDiagnosticoChange} // Agrega este manejador de cambios
          />
          {diagnosticoError && <p className="text-red-500">{diagnosticoError}</p>}
        </div>


        <div className="flex">
          <div className="w-1/3 pr-3">
            <button
              className="mt-1 p-2 border rounded-md w-full bg-blue-500 text-white"
              onClick={handleGuardarClick}
              disabled={!diagnosticoMascota || diagnosticoError}
            >
              GUARDAR
            </button>
          </div>
          <div className="w-1/3 pl-3">
            <button
              className="mt-1 p-2 border rounded-md w-full bg-red-500 text-white"
              onClick={handleCancelarClick}
            >
              CANCELAR
            </button>
          </div>
          <div className="w-1/3 pl-3">
            <button
              className="mt-1 p-2 border rounded-md w-full bg-green-500 text-white"
              onClick={() => openUrlInNewTab()}

            >
              MEET
            </button>
          </div>
        </div>




      </div>
    </div>
  </div>
)}

      {successMessage && (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-green-500 text-white p-4 rounded-lg shadow-lg'>
          <p>{successMessage}</p>
        </div>
      </div>
    )}

    </section>
  );
}
