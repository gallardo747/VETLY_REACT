import React, { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link, useLocation} from 'wouter';
import { useMascotas } from '../hooks/useMascotas';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import MascotaCard from '../components/Cards/MascotaCard';

// IMPORTAR LAS DIMENSIONES

import { useEspecies } from '../hooks/useEspecies';
import { useRazas } from '../hooks/useRazas';
import { useSexos } from '../hooks/useSexos';
import { useCastrado} from '../hooks/useCastrado';
import { usePerfil } from '../hooks/usePerfil';  // Para levantar el ID CLIENTE


export default function Mascotas() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);

  const { mascotas, agregarMascota } = useMascotas(GLOBALVetly.email, GLOBALVetly.token);
  
  const welcomeText = '¡Mis Mascotas!';
  const { perfil } = usePerfil(GLOBALVetly.id, GLOBALVetly.type);

  // CARGAR LAS DIMENSIONES
  const { especies } = useEspecies();
  const { razas } = useRazas();
  const { sexos } = useSexos();
  const { castrado } = useCastrado();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isEspecieId, setIsEspecieId] = useState(null);
  const [isRazaId, setIsRazaId] = useState(null);
  const [isSexoId, setIsSexoId] = useState(null);
  const [isCastradoId, setIsCastradoId] = useState(null);
  const [nombreMascota, setNombreMascota] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date().toISOString().slice(0, 10)); // Valor inicial: fecha actual
  const [quieroRecibirRecordatorios, setQuieroRecibirRecordatorios] = useState('SI'); // Valor inicial, por ejemplo, 'si'
  const [isFechaValida, setIsFechaValida] = useState(true); // Estado para verificar la validez de la fecha
  const [fechaError, setFechaError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Habilitar el botón GUARDAR cuando el nombre tenga más de 2 letras y la fecha sea válida
    if (nombreMascota.length > 2 && isFechaValida) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [nombreMascota, isFechaValida]);
  
  const validarFecha = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return !isNaN(date.getTime()) && year >= 1900 && year <= 2100;
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setFechaNacimiento(nuevaFecha);
    const fechaEsValida = validarFecha(nuevaFecha);
    setIsFechaValida(fechaEsValida);
    if (!fechaEsValida) {
      setFechaError("La fecha debe ser válida y estar entre 1900 y 2100.");
    } else {
      setFechaError(""); // Limpiar el mensaje de error si la fecha es válida
    }
  };

  // Función para abrir el modal y seleccionar el primer elemento de Especies
  const openModal = () => {
    setIsModalOpen(true);
    if (especies.length > 0) {
      setIsEspecieId(especies[0].id); // Establece el ID del primer elemento
      setIsRazaId(razas[0].id); // Establece el ID del primer elemento
      setIsSexoId(sexos[0].id); // Establece el ID del primer elemento
      setIsCastradoId(castrado[0].id); // Establece el ID del primer elemento
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const enableSaveButton = () => {
    setIsSaveButtonDisabled(false);
  };

  const [, navigate] = useLocation();
  const handleGuardarClick = () => {
    try
    {

    // Verificar que el nombre tenga más de 2 letras
    const nombreValido = nombreMascota.length > 2;
    const fechaEsValida = validarFecha(fechaNacimiento);
    
    // Verificar que el nombre tenga más de 2 letras
    if (nombreValido && fechaEsValida && isEspecieId !== null)  {

      // Crear un nuevo objeto oNuevaMascota con los datos necesarios
      const fechaActual = new Date();
      const oNuevaMascota = {
        nombre: nombreMascota,
        id_Especie: isEspecieId,
        id_cliente: perfil[0].id,
        id_Raza: isRazaId,
        id_Sexo: isSexoId,
        id_Castrado: isCastradoId,
        fecha_Nacimiento: fechaNacimiento,
        fecha_fallecimiento: null,
        quieroRecibirRecordatorios: quieroRecibirRecordatorios,
        auD_FechaCreate:fechaActual, 
        
      };

      // Llamar a la función para agregar la mascota
      agregarMascota(GLOBALVetly.id, oNuevaMascota, GLOBALVetly.token);
      
      // Cerrar el modal y limpiar el nombre
      setIsModalOpen(false);
      setNombreMascota('');

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Mascota registrada exitosamente');
      setTimeout(() => {
        setSuccessMessage('');
        
        // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
        navigate('/');
      }, 1000);
    }

    }
    catch(error){
      setErrorMessage('Error al agregar la mascota. Por favor, inténtalo de nuevo.');
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
    }
  };

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/mascotas'>
        <RedirectToLogin />
        <div className='w-full'>
          <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>{welcomeText}</h3>
            <button className="btn btn-primary ml-2" onClick={openModal}>
              NEW
            </button>
            <h2 className='text-xl font-bold md:text-3xl ml-2'>Agregar Mascota</h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {mascotas.map((mascota) => (
              <MascotaCard
                key={mascota.id}
                id={mascota.id}
                nombre={mascota.nombreMascota}
                Raza={mascota.raza}
                idRaza={mascota.id_raza}
                fechaNacimiento={mascota.fecha_Nacimiento}
                idEspecie={mascota.id_Especie}
                Especie={mascota.especie}
                sCastrado={mascota.castrado}                
                iCastrado={mascota.id_Castrado}
                edad={mascota.edadMascota}
                cliente={mascota.id_cliente}
                sexo={mascota.sexo}
                idSexo={mascota.id_Sexo}
                quieroRecibirRecordatorios={mascota.quieroRecibirRecordatorios} 
                fechaCreacion={mascota.auD_FechaCreate} 
              />
            ))}
          </div>
        </div>
      </Route>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Nueva Mascota</h2>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Escribe el nombre aquí"
                value={nombreMascota}
                onChange={(e) => setNombreMascota(e.target.value)}
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/3">
                <label htmlFor="especie" className="block text-sm font-medium text-gray-700">
                  Especie
                </label>
                <select
                  id="especie"
                  name="especie"
                  className="mt-1 p-2 border rounded-md w-full"
                  onChange={(event) => setIsEspecieId(event.target.value)}
                  value={isEspecieId}
                >
                  {especies.map((especie) => (
                    <option key={especie.id} value={especie.id}>
                      {especie.especie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/3">
                <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
                  Raza
                </label>
                <select
                  id="raza"
                  name="raza"
                  className="mt-1 p-2 border rounded-md w-full"
                  onChange={(event) => setIsRazaId(event.target.value)}
                  value={isRazaId}
                >
                   {razas.map((raza) => (
                    <option key={raza.id} value={raza.id}>
                      {raza.raza}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/3">
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
                  Sexo
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  className="mt-1 p-2 border rounded-md w-full"
                  onChange={(event) => setIsSexoId(event.target.value)}
                  value={isSexoId}
                >
                   {sexos.map((sexo) => (
                    <option key={sexo.id} value={sexo.id}>
                      {sexo.sexo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="castrado" className="block text-sm font-medium text-gray-700">
                Castrado
              </label>
              <select
                id="castrado"
                name="castrado"
                className="mt-1 p-2 border rounded-md w-full"
                onChange={(event) => setIsCastradoId(event.target.value)}
                value={isCastradoId}
              >
                {castrado.map((cas) => (
                    <option key={cas.id} value={cas.id}>
                      {cas.castrado}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                className="mt-1 p-2 border rounded-md w-full"
                value={fechaNacimiento}
                onChange={handleFechaChange}
              />
              {fechaError && (
                <div className="text-red-500">{fechaError}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="recordatorios" className="block text-sm font-medium text-gray-700">
                Quiero recibir Recordatorios
              </label>
              <select
                id="recordatorios"
                name="recordatorios"
                className="mt-1 p-2 border rounded-md w-full"
                value={quieroRecibirRecordatorios}
                onChange={(e) => setQuieroRecibirRecordatorios(e.target.value)}
              >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
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
        </div>
      )}
      {successMessage && (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-green-500 text-white p-4 rounded-lg shadow-lg'>
          <p>{successMessage}</p>
        </div>
      </div>
    )}

      {errorMessage && (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-green-500 text-white p-4 rounded-lg shadow-lg'>
          <p>{errorMessage}</p>
        </div>
      </div>
    )}


    </section>
  );
}
