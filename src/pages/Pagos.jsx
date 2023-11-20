import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route } from 'wouter';
import { UserContext } from '../contexts/User';
import { useTablerosVeteAñoMes_Consultas, useTablerosVete_ProfesionalesIncorporados, useTablerosVete_HistoricoPagos } from '../hooks/useTableros';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------



export default function Pagos() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const [usuario, setUsuario] = useState(null);

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
  const { GLOBALVetly } = useContext(UserContext);
  useEffect(() => {
    setUsuario(GLOBALVetly.id);
  }, [GLOBALVetly.id]);


    
  // METRICA 1: MESES DE CONSULTAS DE LA VETERINARIA
  const { KPIAñoMesConsultasVete, actualizarKPIAñoMesConsultas } = useTablerosVeteAñoMes_Consultas(usuario);
  const [solicitudesAñoMesLoaded, setsolicitudesAñoMesLoaded] = useState(false);

  useEffect(() => {
    if (usuario !== null) {
      actualizarKPIAñoMesConsultas(usuario);
    }
  }, [usuario]);

  useEffect(() => {
    if (!solicitudesAñoMesLoaded) {
      // Este efecto se ejecutará solo una vez al cargar la página
      setsolicitudesAñoMesLoaded(true);
    }
  }, [solicitudesAñoMesLoaded, usuario, GLOBALVetly.id]);

  // Estado para gestionar las tarjetas seleccionadas
  const [selectedCards, setSelectedCards] = useState([]);
  // Estado para gestionar la página actual de la paginación
  const [currentPage, setCurrentPage] = useState(1);
  // Cantidad de elementos por página
  const elementsPerPage = 6;

  // Función para manejar el clic en una tarjeta

      // Estado para gestionar los filtros
  const [selectedTime, setSelectedTime] = useState([]);
  const handleCardClick = (index) => {

    const MesAño = itemsToDisplay[index].mes + '/'+ itemsToDisplay[index].año;

    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((item) => item !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }

          // Verificar si el apellido ya está en la lista de seleccionados
          if (selectedTime.includes(MesAño)) {
            // Si ya está seleccionado, lo eliminamos de la lista
            setSelectedTime(selectedTime.filter((item) => item !== MesAño));
          } else {
            // Si no está seleccionado, lo añadimos a la lista
            setSelectedTime([...selectedTime, MesAño]);
          }

  };

  // Ordenar el array de KPIAñoMesConsultasVete en forma descendente
  const sortedKPIAñoMesConsultasVete = [...KPIAñoMesConsultasVete].sort((a, b) =>
    a.año === b.año ? b.mes - a.mes : b.año - a.año
  );

  // Cálculo de la cantidad total de páginas
  const totalPages = Math.ceil(sortedKPIAñoMesConsultasVete.length / elementsPerPage);

  // Calcular los índices de los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = Math.min(startIndex + elementsPerPage, sortedKPIAñoMesConsultasVete.length);

  // Obtener los elementos a mostrar en la página actual
  const itemsToDisplay = sortedKPIAñoMesConsultasVete.slice(startIndex, endIndex);

    // METRICA 2: PROFESIONALES DE LA VETERINARIA
    const { KPIVeteProfesionalesIncorporados, actualizarKPI_ProfesionalesIncorporados } = useTablerosVete_ProfesionalesIncorporados(usuario);
    const [solicitudesProfVeteLoaded, setsolicitudesProfVeteLoaded] = useState(false);
  
    useEffect(() => {
      if (usuario !== null) {
        actualizarKPI_ProfesionalesIncorporados(usuario);
      }
    }, [usuario]);
  
    useEffect(() => {
      if (!solicitudesProfVeteLoaded) {

        // Este efecto se ejecutará solo una vez al cargar la página
        setsolicitudesProfVeteLoaded(true);
      }
    }, [solicitudesProfVeteLoaded, usuario, GLOBALVetly.id]);

    const [selectedProfessional, setSelectedProfessional] = useState([]);
    // Estado para gestionar los apellidos de profesionales seleccionados
    const [profesionalesSeleccionados, setProfesionalesSeleccionados] = useState([]);

    useEffect(() => {
      if (usuario !== null) {
        actualizarKPI_ProfesionalesIncorporados(usuario);
      }
    }, [usuario]);
    
    const handleProfessionalClick = (index) => {
      // Obtener el apellido del profesional seleccionado
      const apellido = KPIVeteProfesionalesIncorporados[index].apellido;
  
      if (selectedProfessional.includes(index)) {
        // Si el profesional ya está seleccionado, lo eliminamos de la lista
        setSelectedProfessional(selectedProfessional.filter((item) => item !== index));
      } else {
        // Si el profesional no está seleccionado, lo añadimos a la lista
        setSelectedProfessional([...selectedProfessional, index]);
      }

      // Verificar si el apellido ya está en la lista de seleccionados
      if (profesionalesSeleccionados.includes(apellido)) {
        // Si ya está seleccionado, lo eliminamos de la lista
        setProfesionalesSeleccionados(profesionalesSeleccionados.filter((item) => item !== apellido));
      } else {
        // Si no está seleccionado, lo añadimos a la lista
        setProfesionalesSeleccionados([...profesionalesSeleccionados, apellido]);
      }

    };
    

  // METRICA 3: HISTORICO DE PAGOS
  const { KPIVeteHistoricoPagos, actualizarKPI_VeteHistoricoPagos } = useTablerosVete_HistoricoPagos(usuario);
  const [solicitudesVeteHisPagosLoaded, setsolicitudesVeteHisPagosLoaded] = useState(false);

  useEffect(() => {
    if (usuario !== null) {
      actualizarKPI_VeteHistoricoPagos(usuario);
    }
  }, [usuario]);

  useEffect(() => {
    if (!solicitudesVeteHisPagosLoaded) {

      // Este efecto se ejecutará solo una vez al cargar la página
      setsolicitudesVeteHisPagosLoaded(true);
    }
  }, [solicitudesVeteHisPagosLoaded, usuario, GLOBALVetly.id]);


  // Filtra los elementos de KPIVeteHistoricoPagos por los apellidos seleccionados
    const historicoPagosFiltrados = KPIVeteHistoricoPagos.filter((item) => {
      const isSelectedApellido = profesionalesSeleccionados.includes(item.apellido);
      const isSelectedFecha =  selectedTime.includes(`${item.mes}/${item.año}`);
      return (isSelectedApellido !== null && isSelectedFecha !== null) ? (isSelectedApellido && isSelectedFecha) : (isSelectedApellido || isSelectedFecha);
    });
    

  
  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/pagos'>
        <div className='w-full'>
          <h3 className='text-2xl font-bold'>
              <FormattedMessage id="pagos.periodo" defaultMessage="Seleccione un Periodo"/>
          </h3>
          <div className='grid grid-cols-3 gap-2'>
            {itemsToDisplay.length > 0 ? (
              itemsToDisplay.map((item, index) => (
                <div
                  key={index} // Añadir startIndex para mantener la unicidad de las keys
                  className={`card p-2 ${
                    selectedCards.includes(index) ? 'border border-primary' : ''
                  }`}
                  style={{
                    width: '9rem',
                    height: '3.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className='card-body'>
                    <h5 className='card-title'>{`${item.mes}/${item.año}`}</h5>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay registros de pagos.</p>
            )}
          </div>
          {/* Paginación */}
          <nav>
            <ul className='pagination'>
              {Array.from({ length: totalPages }).map((_, page) => (
                <li
                  key={page}
                  className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}
                >
                  <a
                    className='page-link'
                    onClick={() => setCurrentPage(page + 1)}
                  >
                    {page + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>



          <div className='w-full'>
            <h3 className='text-2xl font-bold'>
                  <FormattedMessage id="pagos.profesional" defaultMessage="Seleccione un Profesional"/>
            </h3>
            <div className='grid grid-cols-3 gap-2'>
              {KPIVeteProfesionalesIncorporados.length > 0 ? (
                KPIVeteProfesionalesIncorporados.map((item, index) => (
                  <div
                  key={index}
                  className={`card p-2 ${
                    selectedProfessional.includes(index) ? 'border border-primary' : ''
                  }`}
                    style={{
                      width: '9rem',
                      height: '3.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                    onClick={() => handleProfessionalClick(index)}
                  >
                    <div className='card-body'>
                      <h5 className='card-title'>{item.apellido}</h5>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay registros de profesionales.</p>
              )}
            </div>
          </div>

          <h3 className='text-2xl font-bold'>
                <FormattedMessage id="pagos.HistoricoPagos" defaultMessage="Histórico de Pagos"/>
          </h3>

          {GLOBALVetly.type === 'VETERINARIA' && (
            <div className='col-md-15 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  {historicoPagosFiltrados !== null ? (
                    <div className='chart-container'>
                      <Bar
                        data={{
                          labels: historicoPagosFiltrados.map((item) => `${item.apellido} - ${item.mes}/${item.año}`),
                          datasets: [
                            {
                              label: 'Cantidad de Pagos Acumulados',
                              data: historicoPagosFiltrados.map((item) => item.pagos_Acumulados_mesActual),
                              backgroundColor: 'rgba(75, 192, 192, 0.2)',
                              borderColor: 'rgba(75, 192, 192, 1)',
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



        </div>
      </Route>
    </section>
  );
}
