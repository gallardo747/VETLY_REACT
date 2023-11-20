import {React, useState, useEffect, useContext}  from 'react';
import ProfesionalImage from '../Cards/profesional.png';
import Modal from 'react-modal';
import { UserContext } from '/src/contexts/user';
import { Route, Link, useLocation} from 'wouter';
import { useProfesionales } from '/src/hooks/useProfesionales';


const PerfilProfesionalCard = ({ id, nombre, apellido, dni, matricula, telefono, fechaCreacion }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  
  const [nombreProfesional, setNombreProfesional] = useState(nombre);
  const [apellidoProfesional, setApellidoProfesional] = useState(apellido);
  const [dniProfesional, setDniProfesional] = useState(dni);
  const [telefonoProfesional, setTelefonoProfesional] = useState(telefono);
  const [matriculaProfesional, setMatriculaProfesional] = useState(matricula);
  const [successMessage, setSuccessMessage] = useState('');
  const [matriculaError, setMatriculaError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [dniError, setDniError] = useState('');
  const [apellidoError, setApellidoError] = useState('');

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);

  //IMPORTO LA FUNCIONALIDAD DE PROFESIONALES
  const { updateProfesional } = useProfesionales();

  useEffect(() => {
    // Habilitar el botón GUARDAR cuando todas las condiciones son verdaderas
    if (
      nombreProfesional.length > 2 && nombreProfesional.length < 50  &&
      !matriculaError &&
      !telefonoError  &&
      !dniError &&
      !apellidoError
    ) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [nombreProfesional, matriculaError, telefonoError, dniError]);


  
  let imageSource = null;
    imageSource = ProfesionalImage;

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const enableSaveButton = () => {
    setIsSaveButtonDisabled(false);
  };

  const [, navigate] = useLocation();

  const handleGuardarClick = () => {

    // Verificar que el nombre tenga más de 2 letras
    const nombreValido = nombreProfesional.length > 2 && nombreProfesional.length < 50;

    // Verificar la matrícula
    if (!matriculaProfesional) {
      setMatriculaError('La matrícula no puede estar vacía');
      return; // No continuar con la actualización
    } else if (matriculaProfesional.length > 20) {
      setMatriculaError('Hasta 20 caracteres permitidos en la matrícula');
      return; // No continuar con la actualización
    } else {
      setMatriculaError(''); // Limpiar mensaje de error si la matrícula es válida
    }

        // Verificar el teléfono
        if (!telefonoProfesional) {
          setTelefonoError('El teléfono no puede estar vacío');
          return; // No continuar con la actualización
        } else if (telefonoProfesional.length > 20) {
          setTelefonoError('Hasta 20 caracteres permitidos en el teléfono');
          return; // No continuar con la actualización
        } else {
          setTelefonoError('');
        }

         // Verificar el dni
        if (!dniProfesional) {
          setDniError('El dni no puede estar vacío');
          return; // No continuar con la actualización
        } else if (dniProfesional.length > 20) {
          setDniError('Hasta 20 caracteres permitidos en el DNI');
          return; // No continuar con la actualización
        } else {
          setDniError(''); 
        }

       // Verificar el Apellido
        if (!apellidoProfesional) {
          setApellidoError('El Apellido no puede estar vacío');
          return; // No continuar con la actualización
        } else if (apellidoProfesional.length > 50) {
          setDniError('Hasta 50 caracteres permitidos en el Apellido');
          return; // No continuar con la actualización
        } else {
          setApellidoError(''); 
        }
    if (nombreValido) {
      // Crear un nuevo objeto oNuevoProfesional con los datos necesarios
      const fechaActual = new Date().toISOString();

      const oNuevoProfesional = {
        id: id,
        nombre: nombreProfesional,
        apellido: apellidoProfesional,
        dni: dniProfesional,
        telefono: telefonoProfesional,
        matricula: matriculaProfesional,
        id_usuario: GLOBALVetly.id,
        auD_FechaCreate: fechaCreacion,
        auD_FechaModify: fechaActual,
      };
      // Llamar a la función para ACTUALIZAR el Profesional
      updateProfesional(GLOBALVetly.id, oNuevoProfesional, GLOBALVetly.token);
      
      // Cerrar el modal y limpiar el nombre
      setModalIsOpen(false);
      setNombreProfesional('');
      setMatriculaProfesional('');
      setTelefonoProfesional('');

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Datos del Profesional Actualizado exitosamente');

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
          <img src={imageSource} alt="Profesional" className="img-fluid" />
          <button className="btn btn-primary mt-2" onClick={() => setModalIsOpen(true)}>Editar</button>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title"><strong>{nombre}</strong> <strong>{apellido}</strong></h5>
            <p className="card-text">Legajo #<strong>{id}</strong></p>
            <p className="card-text">DNI: <strong>{dni}</strong></p>
            <p className="card-text">Matricula: <strong>{matricula}</strong>  </p>
            <p className="card-text">Telefono: <strong>{telefono}</strong>   </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Profesional"
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
        <h2 className="text-xl font-bold mb-4">Editar Profesional</h2>

        <div className="flex mb-4">
          <div className="w-1/3 pr-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
            type="text"
            id="nombre"
            name="nombre"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Nombre"
            defaultValue={nombreProfesional}
            onChange={(e) => setNombreProfesional(e.target.value)}
          />
          </div>
          <div className="w-1/3 pr-2">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
            type="text"
            id="apellido"
            name="apellido"
            className={`mt-1 p-2 border rounded-md w-full ${
              apellidoError ? 'border-red-500' : ''
            }`}
            placeholder="Apellido"
            defaultValue={apellidoProfesional}
            onChange={(e) => {
              setApellidoProfesional(e.target.value);
              setApellidoError(''); // Limpiar mensaje de error al editar el teléfono
            }}
          />
          {apellidoError && (
            <p className="text-red-500 text-xs mt-2">{apellidoError}</p>
          )}
          </div>
          <div className="w-1/3">
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
              Documento
            </label>
            <input
            type="text"
            id="dni"
            name="dni"
            className={`mt-1 p-2 border rounded-md w-full ${
              dniError ? 'border-red-500' : ''
            }`}
            placeholder="Documento"
            defaultValue={dni}
            onChange={(e) => {
              setDniProfesional(e.target.value);
              setDniError(''); 
            }}
          />
          {dniError && (
            <p className="text-red-500 text-xs mt-2">{dniError}</p>
          )}
            </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/3">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
      Matrícula
          </label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            className={`mt-1 p-2 border rounded-md w-full ${
              matriculaError ? 'border-red-500' : ''
            }`}
            placeholder="Documento"
            value={matriculaProfesional}
            onChange={(e) => {
              setMatriculaProfesional(e.target.value);
              setMatriculaError(''); // Limpiar mensaje de error al editar la matrícula
            }}
          />
          {matriculaError && (
            <p className="text-red-500 text-xs mt-2">{matriculaError}</p>
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
                  placeholder="Teléfono"
                  defaultValue={telefono}
                  onChange={(e) => {
                    setTelefonoProfesional(e.target.value);
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

export default PerfilProfesionalCard;;


