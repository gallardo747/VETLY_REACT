import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import { useGetUsuarios } from '../hooks/useUser';
import { Pagination } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useBitacoras } from '../hooks/useBitacoras';
// Importa FontAwesome y los iconos que necesitas
import 'font-awesome/css/font-awesome.min.css';
//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------



export default function Bitacoras() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const { usuarios } = useGetUsuarios();
  const { GLOBALVetly } = useContext(UserContext);
  const welcomeText = 'Registro del Sistema';

  const { bitacoras, actualizarBitacoras } = useBitacoras(GLOBALVetly.id);

  const [selectedUserId, setSelectedUserId] = useState(GLOBALVetly.id);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleSearch = () => {
    // Llama a la función para actualizar las bitácoras con el nuevo usuario seleccionado
    actualizarBitacoras(selectedUserId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Habilitar formato de 12 horas (AM/PM)
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace(/[,]/g, ''); // Eliminar las comas (puedes omitir esta línea si las comas son aceptables)
  };
    // Estado para rastrear la columna actual y el tipo de orden
    const [sortColumn, setSortColumn] = useState('FECHA');
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
   const sortedBitacoras = [...bitacoras].sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (sortColumn === 'auD_FechaCreacion') {
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

  const currentItems = sortedBitacoras.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
    }
    return 'fa fa-sort';
  };


  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/bitacoras'>
        <RedirectToLogin />
        <div className='w-full'>
        
        {GLOBALVetly.type === 'ADMIN' && (
            <div className="flex items-center py-2"> {/* Reduce the py value */}
              <div>
                <h3 className='text-xl font-bold md:text-3xl ml-2'>
                  <FormattedMessage id="bitacora.registro" defaultMessage={welcomeText}/>
                </h3>
              </div>
            </div>
        )}

        {GLOBALVetly.type === 'ADMIN' && (
            <div className="flex items-center py-2"> {/* Reduce the py value */}
              <div>
                <h4 className='text-sm font-bold md:text-xl ml-2'>
                    <FormattedMessage id="bitacora.auditoria" defaultMessage={"Seleccione el Usuario a auditar:"}/>
                </h4>
              </div>
            </div>
        )}

        {GLOBALVetly.type === 'ADMIN' && (
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="filter-container">
                    <div className="filter-group">
                    <div className="btn-group">
                        <select
                          className="btn btn-dark dropdown-toggle"
                          data-bs-toggle="dropdown"
                          style={{ fontSize: '11px' }}
                          value={selectedUserId}
                          onChange={handleUserChange}
                        >
                          <option className="dropdown-item" style={{ background: 'black', color: 'white' }} value="" aria-labelledby="dropdownMenuButton2">
                              <FormattedMessage id="bitacora.seleccione" defaultMessage={"Selecciona un usuario"}/>
                          </option>
                          {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id} style={{ background: 'black', color: 'white' }}>
                              {usuario.email}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>
                </td>
                <td className="text-center">
              
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    <FormattedMessage id="bitacora.buscar" defaultMessage={"Buscar"}/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        
        )}

        
        {GLOBALVetly.type === 'ADMIN' && (
          <table className="table table-striped">
            <thead className="table-sm">
              <tr>
                <th scope="col" onClick={() => handleSort('id')}>ID <i className={getSortIcon('email')}></i></th>
                <th scope="col" onClick={() => handleSort('usuario')}>
                    <FormattedMessage id="bitacora.usuario" defaultMessage={"USUARIO"}/> 
                    <i className={getSortIcon('usuario')}></i>
                    </th>
                <th scope="col"  onClick={() => handleSort('tabla')}>
                    <FormattedMessage id="bitacora.tabla" defaultMessage={"TABLA"}/>
                    <i className={getSortIcon('tabla')}></i>
                     </th>
                <th scope="col" onClick={() => handleSort('description')}>
                    <FormattedMessage id="bitacora.descripcion" defaultMessage={"DESCRIPCIÓN"}/>
                    <i className={getSortIcon('description')}></i>
                    </th>
                <th scope="col"  onClick={() => handleSort('record')}>
                    <FormattedMessage id="bitacora.log" defaultMessage={"REGISTRO"}/>
                    <i className={getSortIcon('record')}></i></th>
                <th scope="col" onClick={() => handleSort('auD_FechaCreacion')}>
                    <FormattedMessage id="bitacora.fecha" defaultMessage={"FECHA"}/> 
                      <i className={getSortIcon('auD_FechaCreacion')}></i>
                      </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((bitacora) => (
                <tr key={bitacora.id}>
                  <td className="small-font">{bitacora.id}</td>
                  <td className="small-font">{bitacora.id_Usuario}</td>
                  <td className="small-font">{bitacora.bTable}</td>
                  <td className="small-font">{bitacora.description}</td>
                  <td className="small-font">{bitacora.record}</td>
                  <td className="small-font">{formatDate(bitacora.auD_FechaCreacion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

          <Pagination>
            {Array.from({ length: Math.ceil(bitacoras.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </Route>
    </section>
  );
}
