import {React, useState, useEffect, useContext}  from 'react';
import clienteImage from '../Cards/dueño.png';
import Modal from 'react-modal';
import { UserContext } from '@/contexts/user';
import { Route, Link, useLocation} from 'wouter';
import { useCliente } from '@/hooks/useCliente';

// IMPORTAR LAS DIMENSIONES

import { usePaises } from '@/hooks/usePaises';
import { useProvincias } from '@/hooks/useProvincias';
import { useCiudades } from '@/hooks/useCiudades';

const PerfilClienteCard = ({ id, nombre, apellido,  calle, numero, piso, cp, fechaNacimiento, idPais, idProvincia, idCiudad, dni, telefono, fechaCreacion }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fechaError, setFechaError] = useState(''); // Agregamos el estado para el mensaje de error de fecha
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  // CARGAR LAS DIMENSIONES
  const { paises } = usePaises();
  const { provincias } = useProvincias();
  const { ciudades } = useCiudades();
  

  const [isPaisId, setIsPaisId] = useState(idPais);
  const [isProvinciaId, setIsProvinciaId] = useState(idProvincia);
  const [isCiudadId, setIsCiudadId] = useState(idCiudad);
  const [isFechaNacimiento, setIsFechaNacimiento] = useState(fechaNacimiento);
  const [nombreCliente, setNombreCliente] = useState(nombre);
  const [apellidoCliente, setApellidoCliente] = useState(apellido);
  const [dniCliente, setDniCliente] = useState(dni);
  const [calleCliente, setCalleCliente] = useState(calle);
  const [numeroCliente, setNumeroCliente] = useState(numero);
  const [telefonoCliente, setTelefonoCliente] = useState(telefono);
  const [pisoCliente, setPisoCliente] = useState(piso);
  const [cpCliente, setCpCliente] = useState(cp);
  const [isFechaValida, setIsFechaValida] = useState(true); // Estado para verificar la validez de la fecha
  const [successMessage, setSuccessMessage] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [cpError, setCpError] = useState('');
  const [dniError, setDniError] = useState('');
  const [pisoError, setPisoError] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [calleError, setCalleError] = useState('');


  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO
  const { GLOBALVetly } = useContext(UserContext);

  //IMPORTO LA FUNCIONALIDAD DE CLIENTE
  const { updateCliente } = useCliente();

  useEffect(() => {
    // Habilitar el botón GUARDAR cuando todas las condiciones son verdaderas
    if (
      nombreCliente.length > 2 &&
      isFechaValida &&
      isPaisId !== null && isPaisId !== '' &&
      isProvinciaId !== null && isProvinciaId !== '' &&
      isCiudadId !== null && isCiudadId !== ''  &&
      !telefonoError &&
      !cpError &&
      !dniError &&
      !numeroError &&
      !calleError

    ) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [nombreCliente, isFechaValida, isPaisId, isProvinciaId, isCiudadId, telefonoError, cpError, dniError, pisoError, numeroError, calleError]);

  const validarFecha = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return !isNaN(date.getTime()) && year >= 1900 && year <= 2100;
  };
  
  let imageSource = null;
    imageSource = clienteImage;

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
    const nombreValido = nombreCliente.length > 2 && nombreCliente.length < 50;
    const fechaEsValida = validarFecha(fechaNacimiento);
    
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

    // Verificar el dni
      if (!dniCliente) {
        setDniError('El dni no puede estar vacío');
        return; // No continuar con la actualización
      } else if (dniCliente.length > 20) {
        setDniError('Hasta 20 caracteres permitidos en el DNI');          
        return; // No continuar con la actualización
      } else {
        setDniError(''); 
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


    // Verificar que el nombre tenga más de 2 letras
    if (nombreValido && fechaEsValida && isPaisId !== null && isProvinciaId !== null && isCiudadId !== null)   {

      // Crear un nuevo objeto oNuevoCLiente con los datos necesarios
      const fechaActual = new Date();

      const oNuevoCliente = {
        id:id,
        nombre: nombreCliente,
        apellido: apellidoCliente,
        dni:dniCliente,
        calle:calleCliente,
        numero:numeroCliente,
        piso:pisoCliente,
        cp:cpCliente,
        id_Pais: isPaisId,
        id_Provincia: isProvinciaId,
        id_Ciudad: isCiudadId,
        fecha_Nacimiento: isFechaNacimiento,
        telefono:telefonoCliente,
        id_usuario: GLOBALVetly.id,
        auD_FechaCreate: fechaCreacion,
        auD_FechaModify: fechaActual
      };

      
      // Llamar a la función para ACTUALIZAR el CLIENTE
      updateCliente(GLOBALVetly.id, oNuevoCliente, GLOBALVetly.token);
      
      // Cerrar el modal y limpiar el nombre
      setModalIsOpen(false);
      setNombreCliente('');

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Datos del Cliente Actualizado exitosamente');

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
            <h5 className="card-title"><strong>{nombre}</strong> <strong>{apellido}</strong></h5>
            <p className="card-text">Legajo #<strong>{id}</strong></p>
            <p className="card-text">DNI: <strong>{dni}</strong></p>
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
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

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
            defaultValue={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
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
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Apellido"
            defaultValue={apellidoCliente}
            onChange={(e) => setApellidoCliente(e.target.value)}
          />
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
              setDniCliente(e.target.value);
              setDniError(''); // Limpiar mensaje de error al editar el teléfono
            }}
          />
          {dniError && (
            <p className="text-red-500 text-xs mt-2">{dniError}</p>
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

export default PerfilClienteCard;;


