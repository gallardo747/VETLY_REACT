import {React, useState, useEffect, useContext}  from 'react';
import dogImage from '../Cards/dog.png';
import catImage from '../Cards/cat.png';
import otherImage from '../Cards/other.png';
import Modal from 'react-modal';
//import { UserContext } from '/src/contexts/user';
import { UserContext } from '@/contexts/user';
import { Route, Link, useLocation} from 'wouter';
import { useMascotas } from '@/hooks/useMascotas';

// IMPORTAR LAS DIMENSIONES

import { useEspecies } from '@/hooks/useEspecies';
import { useRazas } from '@/hooks/useRazas';
import { useSexos } from '@/hooks/useSexos';
import { useCastrado} from '@/hooks/useCastrado';



const MascotaCard = ({ id, nombre, Raza, idRaza, edad, Especie, idEspecie, sCastrado, iCastrado, sexo, idSexo, quieroRecibirRecordatorios, fechaNacimiento, cliente, fechaCreacion }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fechaError, setFechaError] = useState(''); // Agregamos el estado para el mensaje de error de fecha
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  // CARGAR LAS DIMENSIONES
  const { especies } = useEspecies();
  const { razas } = useRazas();
  const { sexos } = useSexos();
  const { castrado } = useCastrado();

  const [isEspecieId, setIsEspecieId] = useState(idEspecie);
  const [isRazaId, setIsRazaId] = useState(idRaza);
  const [isSexoId, setIsSexoId] = useState(idSexo);
  const [isCastradoId, setIsCastradoId] = useState(iCastrado);
  const [isFechaNacimiento, setIsFechaNacimiento] = useState(fechaNacimiento);
  const [nombreMascota, setNombreMascota] = useState(nombre);
  const [isQuieroRecibirRecordatorios, setIsQuieroRecibirRecordatorios] = useState(quieroRecibirRecordatorios); 
  const [isFechaValida, setIsFechaValida] = useState(true); // Estado para verificar la validez de la fecha
  const [successMessage, setSuccessMessage] = useState('');

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);
  const { mascotas, updateMascota } = useMascotas(GLOBALVetly.email, GLOBALVetly.token);

  
  useEffect(() => {
    // Habilitar el botón GUARDAR cuando el nombre tenga más de 2 letras y la fecha sea válida
    if (nombreMascota.length > 2 && nombreMascota.length <48 && isFechaValida) {
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
  
  let imageSource = null;

  if (Especie === 'Perro') {
    imageSource = dogImage;
  } else if (Especie === 'Gato') {
    imageSource = catImage;
  } else {
    imageSource = otherImage;
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

 
  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setIsFechaNacimiento(nuevaFecha);
    const fechaEsValida = validarFecha(nuevaFecha);
    setIsFechaValida(fechaEsValida);
    if (!fechaEsValida) {
      setFechaError("La fecha debe ser válida y estar entre 1900 y 2100.");
    } else {
      setFechaError(""); // Limpiar el mensaje de error si la fecha es válida
    }
  };

  const enableSaveButton = () => {
    setIsSaveButtonDisabled(false);
  };

  const [, navigate] = useLocation();

  const handleGuardarClick = () => {

    // Verificar que el nombre tenga más de 2 letras
    const nombreValido = nombreMascota.length > 2;
    const fechaEsValida = validarFecha(fechaNacimiento);
    
    // Verificar que el nombre tenga más de 2 letras
    if (nombreValido && fechaEsValida && isEspecieId !== null)  {

      // Crear un nuevo objeto oNuevaMascota con los datos necesarios
      
      const fechaActual = new Date();
      const oNuevaMascota = {
        id:id,
        nombre: nombreMascota,
        id_Especie: isEspecieId,
        id_cliente: cliente,
        id_Raza: isRazaId,
        id_Sexo: isSexoId,
        id_Castrado: isCastradoId,
        fecha_Nacimiento: isFechaNacimiento,
        fecha_fallecimiento: null,
        quieroRecibirRecordatorios: isQuieroRecibirRecordatorios,
        auD_FechaCreate:fechaCreacion,
        auD_FechaModify:fechaActual,
        
      };
      // Llamar a la función para ACTUALIZAR la mascota
      updateMascota(GLOBALVetly.id, oNuevaMascota, GLOBALVetly.token);
      
      // Cerrar el modal y limpiar el nombre
      setModalIsOpen(false);
      setNombreMascota('');

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Mascota registrada exitosamente');

      setTimeout(() => {
        setSuccessMessage('');
        // Redirigir a la ruta "/turno_medico" después de mostrar el mensaje
        navigate('/');
      }, 1000);



    }
  };

  return (
    <div className="card shadow-lg" style={{ width: '16rem', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={imageSource} alt="Mascota" className="img-fluid" />
          <button className="btn btn-primary mt-2" onClick={() => setModalIsOpen(true)}>Editar</button>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">Legajo #{id}</p>
            <p className="card-text">Especie: {Especie}</p>
            <p className="card-text">Raza: {Raza}</p>
            <p className="card-text">Edad: {edad}</p>
            <p className="card-text">Castrado: {sCastrado}</p>
            <p className="card-text">Sexo: {sexo}</p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Mascota"
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
        <h2 className="text-xl font-bold mb-4">Editar Mascota</h2>
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
        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="especie" className="block text-sm font-medium text-gray-700">
              Especie
            </label>
            <select
              id="especie"
              name="especie"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setIsEspecieId(e.target.value)}
              defaultValue={idEspecie}
            >
                  {especies.map((especie) => (
                    <option key={especie.id} value={especie.id}>
                      {especie.especie}
                    </option>
                  ))}
                </select>
          </div>
          <div className="w-1/3 pr-2">
            <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
              Raza
            </label>
            <select
              id="raza"
              name="raza"
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => setIsRazaId(e.target.value)}
              defaultValue={idRaza}
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
              onChange={(e) => setIsSexoId(e.target.value)}
              defaultValue={idSexo}
            >
                   {sexos.map((sexo) => (
                    <option key={sexo.id} value={sexo.id}>
                      {sexo.sexo}
                    </option>
                  ))}
                </select>
            </div>
        </div>
        {/* Agregamos los nuevos elementos aquí */}
        <div className="mb-4">
          <label htmlFor="castrado" className="block text-sm font-medium text-gray-700">
            Castrado
          </label>
          <select
            id="castrado"
            name="castrado"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={(event) => setIsCastradoId(event.target.value)}
            defaultValue={iCastrado}
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
            defaultValue={fechaNacimiento ? fechaNacimiento.split('T')[0] : ''} // Formatea y establece la fecha inicial
            onChange={handleFechaChange} // Agrega el evento onChange para manejar cambios en la fecha
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
                defaultValue={quieroRecibirRecordatorios}
                onChange={(e) => setIsQuieroRecibirRecordatorios(e.target.value)}
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

export default MascotaCard;


