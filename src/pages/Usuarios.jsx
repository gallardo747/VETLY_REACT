import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link, useLocation} from 'wouter';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import { useGetUsuarios, ActualizarDatosUsuario, ActualizarEstadoUsuario } from '../hooks/useUser'; // Asegúrate de importar ActualizarDatosUsuario
import '../style/usuarios.css';

// Importa FontAwesome y los iconos que necesitas
import 'font-awesome/css/font-awesome.min.css';
//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------

import { Pagination } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

export default function Usuarios() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const { usuarios } = useGetUsuarios();
  const { GLOBALVetly } = useContext(UserContext);
  const welcomeText = 'Usuarios del Sistema';
  const [successMessage, setSuccessMessage] = useState('');
  const [, navigate] = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  

  // Estado para rastrear la columna actual y el tipo de orden
  const [sortColumn, setSortColumn] = useState('email');
  const [sortOrder, setSortOrder] = useState('asc');

  // Función para cambiar la columna de orden
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Cambiar el tipo de orden si se hace clic nuevamente en la misma columna
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Establecer la nueva columna y el tipo de orden ascendente
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

   // Función para ordenar los usuarios según la columna seleccionada y el tipo de orden
   const sortedUsers = [...usuarios].sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (sortColumn === 'fecha_creacion') {
      // Si la columna es "FECHA CREACION", convierte las fechas en objetos Date para ordenar
      const dateA = new Date(columnA);
      const dateB = new Date(columnB);

      if (dateA < dateB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (dateA > dateB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
    } else {
      // Si no es "FECHA CREACION", realiza la comparación normal
      if (columnA < columnB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (columnA > columnB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
    }

    return 0;
  });
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleActivation = async (usuario) => {
    try {
      // Lógica para cambiar entre ACTIVAR (1) y DESACTIVAR (0)
      const newStatus = usuario.borrado === 1 ? 0 : 1;
      // Fecha actual
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      
      // Llama a la función para actualizar el estado en el servidor
      await ActualizarEstadoUsuario({
        ...usuario,
        borrado: newStatus,
        fecha_borrado: newStatus === 1 ? formattedDate : null,
      });

      // Actualiza el estado local si la solicitud fue exitosa
      usuario.borrado = newStatus;
      usuario.fecha_borrado = newStatus === 1 ? formattedDate : null;

      // Mostrar el mensaje de éxito durante 1 segundo
      setSuccessMessage('Usuario Actualizado exitosamente');

      setTimeout(() => {
      setSuccessMessage('');
      // Redirigir a la ruta después de mostrar el mensaje
      //              navigate('/');
      }, 1000);

    } catch (error) {
      console.error(error);
      // Maneja el error, muestra un mensaje de error o realiza acciones adicionales si es necesario
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
    }
    return 'fa fa-sort';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Función para mapear valores de id_tipo_Usuario a textos
const mapTipoUsuario = (idTipoUsuario) => {
  switch (idTipoUsuario) {
    case 1:
      return 'CLIENTE';
    case 2:
      return 'PROFESIONAL';
    case 3:
      return 'VETE';
    case 4:
      return 'ADMIN';
    default:
      return 'DESCONOCIDO';
  }
};


  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/usuarios'>
        <RedirectToLogin />
        <div className='w-full'>

          
          <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>
            {GLOBALVetly.type === 'ADMIN' && (              
                <FormattedMessage id="usuarios.bienvenida" defaultMessage={welcomeText}/>
            )}
            </h3>
          </div>

        {GLOBALVetly.type === 'ADMIN' && (
          <table className="table table-striped">
            <thead className="table-sm">
              <tr>
                <th scope="col">ID</th>
                <th scope="col" onClick={() => handleSort('email')}>EMAIL  <i className={getSortIcon('email')}></i></th>
                <th scope="col" onClick={() => handleSort('id_tipo_Usuario')}>
                  <FormattedMessage id="usuarios.TipoUsuario" defaultMessage="TIPO USUARIO"/> 
                  <i className={getSortIcon('id_tipo_Usuario')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('fecha_creacion')}>
                  <FormattedMessage id="usuarios.FechaCreacion" defaultMessage="FECHA CREACIÓN"/>
                  <i className={getSortIcon('fecha_creacion')}></i>
                  </th>
                <th scope="col">
                    <FormattedMessage id="usuarios.Activo" defaultMessage="ACTIVO"/>
                </th>
                <th scope="col">
                    <FormattedMessage id="usuarios.FechaDesactivado" defaultMessage="FECHA DESACTIVADO"/>
                </th>
                <th scope="col">
                    <FormattedMessage id="usuarios.Habilitar" defaultMessage="HABILITAR"/>
                </th>
              </tr>
            </thead>
            <tbody>
                {currentItems.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="small-font">{usuario.id}</td>
                    <td className="small-font">{usuario.email}</td>
                    <td className="small-font">{mapTipoUsuario(usuario.id_tipo_Usuario)}</td>
                    <td className="small-font">{formatDate(usuario.fecha_creacion)}</td>
                    <td className={`small-font ${usuario.borrado === 0 ? 'activo' : 'inactivo'}`}>
                      {usuario.borrado === 0 ? 'ACTIVO' : 'INACTIVO'}
                    </td>
                    <td className="small-font">{formatDate(usuario.fecha_borrado)}</td>
                    <td>
                      <button className="btn btn-primary btn-sm small-font" onClick={() => toggleActivation(usuario)}>
                        {usuario.borrado === 1 ? 'ON' : 'OFF'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        
        )}

          <Pagination>
            {Array.from({ length: Math.ceil(usuarios.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {successMessage && (
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <p>{successMessage}</p>
            </div>
          )}


        </div>
      </Route>
    </section>
  );
}
