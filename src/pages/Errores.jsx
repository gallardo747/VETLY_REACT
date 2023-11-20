import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { useTablerosAdmin_ControlExcepciones, useTablerosAdmin_ControlExcepciones_PorMes } from '../hooks/useTableros';
import { UserContext } from '../contexts/User';
import { Pagination } from 'react-bootstrap';
import RedirectToLogin from '../components/RedirectToLogin';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/grillas.css'
// Imports para Graficos de barra
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function Errores() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const welcomeText =  `ERRORES`;
  const [usuario, setUsuario] = useState(null);

    // Estado para rastrear la columna actual y el tipo de orden
    const [sortColumn, setSortColumn] = useState('email');
    const [sortOrder, setSortOrder] = useState('asc');
    const [DataAMostrar, setDataAMostrar] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
    const { GLOBALVetly } = useContext(UserContext);
    useEffect(() => {
      setUsuario(GLOBALVetly.id);
    }, [GLOBALVetly.id]);
  
      // METRICA 1:  EXCEPCIONESS HISTORICO
      const { KPIAdmin_Excepciones, actualizarKPIAdmin_Excepciones } = useTablerosAdmin_ControlExcepciones();
      const [solicitudesLoaded, setsolicitudesLoaded] = useState(false);

      useEffect(() => {
        if (usuario !== null) {
          actualizarKPIAdmin_Excepciones();
          
        }
      }, [usuario]);

      useEffect(() => {

        if (!solicitudesLoaded) {
          // Este efecto se ejecutará solo una vez al cargar la página
        }

      }, [solicitudesLoaded, KPIAdmin_Excepciones, usuario, GLOBALVetly.id, DataAMostrar]);


      const formatDate = (dateString) => {
        if (!dateString) return '';
      
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
      };

      const [startDate, setStartDate] = useState(''); // Estado para Fecha Desde
      const [endDate, setEndDate] = useState('');     // Estado para Fecha Hasta
 
      useEffect(() => {
        // Configura la fecha de 'endDate' por defecto como el día de hoy
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
    
        if (mm < 10) {
          mm = `0${mm}`;
        }
    
        if (dd < 10) {
          dd = `0${dd}`;
        }
    
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        setEndDate(formattedDate);
      }, []);

      // Función para manejar el cambio en el campo Fecha Desde
      const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };

      // Función para manejar el cambio en el campo Fecha Hasta
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };


      const getSortIcon = (column) => {
        if (sortColumn === column) {
          return sortOrder === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
        }
        return 'fa fa-sort';
      };


      const handleFilter = () => {
        // Realiza el filtrado de los datos y muestra solo los que se encuentran en el rango de fechas
        const filteredItems = KPIAdmin_Excepciones.filter((usuario) => {
          const date = new Date(usuario.fechaHora);
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
      
          return date >= startDateObj && date <= endDateObj;
        });

        setDataAMostrar(filteredItems);

        // Reinicia el ordenamiento
        setSortColumn('fechaHora');
        setSortOrder('asc');
      };


      // Función para cambiar la columna de orden
      const handleSort = (column) => {
        // Verificar si estamos ordenando la misma columna
        if (sortColumn === column) {
          // Cambiar el tipo de orden si se hace clic nuevamente en la misma columna
          const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
          setSortOrder(newSortOrder);
      
          // Ordenar los datos en base a la columna y el tipo de orden actual
          const sortedData = [...DataAMostrar].sort((a, b) => {
            if (newSortOrder === 'asc') {
              return a[column].localeCompare(b[column]);
            } else {
              return b[column].localeCompare(a[column]);
            }
          });
      
          // Actualizar los datos ordenados
          setDataAMostrar(sortedData);
        } else {
          // Establecer la nueva columna y el tipo de orden ascendente
          setSortColumn(column);
          setSortOrder('asc');
          // Ordenar los datos en base a la nueva columna y el tipo de orden ascendente
          const sortedData = [...DataAMostrar].sort((a, b) => a[column].localeCompare(b[column]));
          // Actualizar los datos ordenados
          setDataAMostrar(sortedData);
        }
      };
      

      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const currentItems = DataAMostrar.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );



      //METRICA 2 - ERRORES POR MES


            const { KPIAdmin_ExcepcionesPorMes, actualizarKPIAdmin_ExcepcionesPorMes } = useTablerosAdmin_ControlExcepciones_PorMes();
            const [solicitudesMESLoaded, setsolicitudesMESLoaded] = useState(false);
      
            useEffect(() => {
              if (usuario !== null) {
                actualizarKPIAdmin_ExcepcionesPorMes();
                
              }
            }, [usuario]);
      
            useEffect(() => {
      
              if (!solicitudesMESLoaded) {
                // Este efecto se ejecutará solo una vez al cargar la página
              }
      
            }, [solicitudesMESLoaded, KPIAdmin_ExcepcionesPorMes, usuario, GLOBALVetly.id]);
      
      
  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/errores'>
          <RedirectToLogin />
        <div className='w-full'>
          
        <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>
            {GLOBALVetly.type === 'ADMIN' && (              
                <FormattedMessage id="HistorialErrores.bienvenida" defaultMessage={welcomeText}/>
            )}
            </h3>
          </div>

          {GLOBALVetly.type === 'ADMIN' && (
            <div className='col-md-12 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="HistorialErrores.kpi" defaultMessage="KPI CANTIDAD ERRORES"/>
                  </h5>
                  {KPIAdmin_ExcepcionesPorMes !== null ? (
                    <div className='chart-container'>
                      <Bar
                            data={{
                              labels: KPIAdmin_ExcepcionesPorMes.map((item) => item.mes), // Valores para el eje x
                              datasets: [
                                {
                                  label: 'Cantidad de Consultas',
                                  data: KPIAdmin_ExcepcionesPorMes.map((item) => item.cantidad_Errores), // Valores para el eje Y
                                  backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
                                  borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
                                  borderWidth: 1,
                                },
                              ],
                            }}
                            options={{
                              scales: {
                                y: {
                                  beginAtZero: true,
                                },
                              },
                            }}
                        />

                    </div>
                  ) : (
                    <p className='card-text'>Cargando...</p>
                  )}
                </div>
              </div>
            </div>
          )}



          {GLOBALVetly.type === 'ADMIN' && (
            <div className="date-filter">
              <label htmlFor="startDate">
                  <FormattedMessage id="HistorialIngresos.desde" defaultMessage="Fecha Desde:"/>
             </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <label htmlFor="endDate">
                  <FormattedMessage id="HistorialIngresos.hasta" defaultMessage="Fecha Hasta:"/>
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
              <button className="btn btn-primary" onClick={handleFilter} disabled={!startDate}>
                  <FormattedMessage id="HistorialIngresos.filtro" defaultMessage="Filtrar"/> 
                </button>

            </div>
          )}


          {GLOBALVetly.type === 'ADMIN' && DataAMostrar && (    
            
          <table className="table table-striped">
            <thead className="table-sm">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col" onClick={() => handleSort('fechaHora')}>
                    <FormattedMessage id="HistorialErrores.fechaError" defaultMessage="FECHA"/>   
                    <i className={getSortIcon('fechaHora')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('tipoExcepcion')}>
                  <FormattedMessage id="HistorialErrores.Tipo" defaultMessage="TIPO"/> 
                  <i className={getSortIcon('tipoExcepcion')}></i>
                </th>
                <th scope="col" onClick={() => handleSort('mensaje')}>
                  <FormattedMessage id="HistorialErrores.mensaje" defaultMessage="MENSAJE"/> 
                  <i className={getSortIcon('mensaje')}></i>
                </th>                
                <th scope="col" onClick={() => handleSort('datosAdicionales')}>
                  <FormattedMessage id="HistorialErrores.modelo" defaultMessage="MODELO"/> 
                  <i className={getSortIcon('datosAdicionales')}></i>
                </th>         
                <th scope="col" onClick={() => handleSort('informacionUsuario')}>
                  <FormattedMessage id="HistorialErrores.usuario" defaultMessage="USUARIO"/> 
                  <i className={getSortIcon('informacionUsuario')}></i>
                </th>       
              </tr>
            </thead>
            <tbody>
                {currentItems.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="small-font">{usuario.id}</td>
                    <td className="small-font">{formatDate(usuario.fechaHora)}</td>
                    <td className="small-font">{usuario.tipoExcepcion}</td>
                    <td className="small-font">{usuario.mensaje}</td>                    
                    <td className="small-font">{usuario.datosAdicionales}</td>
                    <td className="small-font">{usuario.informacionUsuario}</td>
                  </tr>
                ))}
              </tbody>
          </table>
          
          )}

            <Pagination>
              {Array.from({ length: Math.ceil(DataAMostrar.length / itemsPerPage) }, (_, index) => (
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
