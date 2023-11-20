import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { useTablerosClien_DIagnosticos } from '../hooks/useTableros';
import { UserContext } from '../contexts/User';
import { Pagination } from 'react-bootstrap';
import RedirectToLogin from '../components/RedirectToLogin';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function HistoriaClinica() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const welcomeText =  `DIAGNÓSTICO`;
  const [usuario, setUsuario] = useState(null);
    // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
    const { GLOBALVetly } = useContext(UserContext);
    useEffect(() => {
      setUsuario(GLOBALVetly.id);
    }, [GLOBALVetly.id]);
  
      // METRICA 1: DIAGNÓSTICOS DE CLIENTES
      const { KPIAClienteDiagnosticos, actualizarKPI_ClienteDiagnosticos } = useTablerosClien_DIagnosticos(usuario);
      const [solicitudesLoaded, setsolicitudesLoaded] = useState(false);

      useEffect(() => {
        if (usuario !== null) {
          actualizarKPI_ClienteDiagnosticos(usuario);
        }
      }, [usuario]);

      useEffect(() => {

        if (!solicitudesLoaded) {
          
          // Este efecto se ejecutará solo una vez al cargar la página
          setsolicitudesLoaded(true);
        }

      }, [solicitudesLoaded, KPIAClienteDiagnosticos, usuario, GLOBALVetly.id]);

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
      const sortedUsers = [...KPIAClienteDiagnosticos].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (sortColumn === 'fecha_atencion_inicio') {
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


 

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/historia_clinica'>
          <RedirectToLogin />
        <div className='w-full'>
          
        <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>
            {GLOBALVetly.type === 'CLIENTE' && (              
                <FormattedMessage id="HistorialDiagnostico.bienvenida" defaultMessage={welcomeText}/>
            )}
            </h3>
          </div>


          {GLOBALVetly.type === 'CLIENTE' && (    
          <table className="table table-striped">
            <thead className="table-sm">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col" onClick={() => handleSort('fecha_atencion_inicio')}>
                    <FormattedMessage id="HistorialDiagnostico.fechaAtencion" defaultMessage="FECHA ATENCIÓN"/>   
                    <i className={getSortIcon('fecha_atencion_inicio')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('nombre_Mascota')}>
                  <FormattedMessage id="HistorialDiagnostico.mascota" defaultMessage="MASCOTA"/> 
                  <i className={getSortIcon('nombre_Mascota')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('motivo_consulta_abrev')}>
                  <FormattedMessage id="HistorialDiagnostico.motivo" defaultMessage="MOTIVO CONSULTA"/> 
                  <i className={getSortIcon('motivo_consulta_abrev')}></i>
                </th>                
                <th scope="col" onClick={() => handleSort('apellido')}>
                  <FormattedMessage id="HistorialDiagnostico.profesional" defaultMessage="PROFESIONAL"/> 
                  <i className={getSortIcon('apellido')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('razonSocial')}>
                  <FormattedMessage id="HistorialDiagnostico.veterinaria" defaultMessage="VETERINARIA"/> 
                  <i className={getSortIcon('razonSocial')}></i>
                </th>         
                <th scope="col" onClick={() => handleSort('detalleDiagnostico')}>
                  <FormattedMessage id="HistorialDiagnostico.diagnostico" defaultMessage="DIAGNÓSTICO"/> 
                  <i className={getSortIcon('detalleDiagnostico')}></i>
                </th>       
              </tr>
            </thead>
            <tbody>
                {currentItems.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="small-font">{usuario.id}</td>
                    <td className="small-font">{formatDate(usuario.fecha_atencion_inicio)}</td>
                    <td className="small-font">{usuario.nombre_Mascota}</td>
                    <td className="small-font">{usuario.motivo_consulta_abrev}</td>                    
                    <td className="small-font">{usuario.apellido}</td>
                    <td className="small-font">{usuario.razonSocial}</td>
                    <td className="small-font">{usuario.detalleDiagnostico}</td>
                  </tr>
                ))}
              </tbody>
          </table>
          )}




          <Pagination>
            {Array.from({ length: Math.ceil(KPIAClienteDiagnosticos.length / itemsPerPage) }, (_, index) => (
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
