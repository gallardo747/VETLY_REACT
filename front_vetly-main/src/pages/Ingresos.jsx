import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { useTablerosProf_Pagos } from '../hooks/useTableros';
import { UserContext } from '../contexts/User';
import { Pagination } from 'react-bootstrap';
import RedirectToLogin from '../components/RedirectToLogin';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/grillas.css'

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function Ingresos() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const welcomeText =  `INGRESOS`;
  const [usuario, setUsuario] = useState(null);

    // Estado para rastrear la columna actual y el tipo de orden
    const [sortColumn, setSortColumn] = useState('email');
    const [sortOrder, setSortOrder] = useState('asc');
    const [DataAMostrar, setDataAMostrar] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
    const { GLOBALVetly } = useContext(UserContext);
    useEffect(() => {
      setUsuario(GLOBALVetly.id);
    }, [GLOBALVetly.id]);
  
      // METRICA 1: PAGOS DE PROFESIONALES
      const { KPIProfesional_Pagos, actualizarKPIProfesional_Pagos } = useTablerosProf_Pagos(usuario);
      const [solicitudesLoaded, setsolicitudesLoaded] = useState(false);

      useEffect(() => {
        if (usuario !== null) {
          actualizarKPIProfesional_Pagos(usuario);
          
        }
      }, [usuario]);

      useEffect(() => {

        if (!solicitudesLoaded) {
          // Este efecto se ejecutará solo una vez al cargar la página
        }

      }, [solicitudesLoaded, KPIProfesional_Pagos, usuario, GLOBALVetly.id, DataAMostrar]);


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
        const filteredItems = KPIProfesional_Pagos.filter((usuario) => {
          const date = new Date(usuario.fecha_atencion_inicio);
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
      
          return date >= startDateObj && date <= endDateObj;
        });

        setDataAMostrar(filteredItems);

        // Reinicia el ordenamiento
        setSortColumn('fecha_atencion_inicio');
        setSortOrder('asc');
      };

      // Calcula el total de la columna "Tarifa"
      const calculateTotalTarifa = () => {
        return DataAMostrar.reduce((total, usuario) => total + usuario.tarifa, 0);
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


  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/ingresos'>
          <RedirectToLogin />
        <div className='w-full'>
          
        <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>
            {GLOBALVetly.type === 'PROFESIONAL' && (              
                <FormattedMessage id="HistorialIngresos.bienvenida" defaultMessage={welcomeText}/>
            )}
            </h3>
          </div>


          {GLOBALVetly.type === 'PROFESIONAL' && (
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


          {GLOBALVetly.type === 'PROFESIONAL' && DataAMostrar && (    
            
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
                <th scope="col" className="tarifa-column"  onClick={() => handleSort('tarifa')}>
                  <FormattedMessage id="HistorialIngresos.tarifa" defaultMessage="TARIFA"/> 
                  <i className={getSortIcon('tarifa')}></i>
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
                    <td className="tarifa-value">${usuario.tarifa}</td>
                    <td className="small-font">{usuario.razonSocial}</td>
                    <td className="small-font">{usuario.detalleDiagnostico}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                  <tr>
                    <td colSpan="4"></td>
                    <td className="tarifa-value">
                      <strong>
                            <FormattedMessage id="HistorialIngresos.total" defaultMessage="Total Acumulado: $"/> 
                      {calculateTotalTarifa()}</strong>
                    </td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
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
