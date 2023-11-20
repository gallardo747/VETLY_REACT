import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import CategoryPage from './CategoryPage';
import { Route, Link } from 'wouter';
import '../style/grillas.css';
import { UserContext } from '../contexts/User';
import { useTableros, useTablerosHistoricoMeets,useTablerosProfStatus, useTablerosProfPagosConcretados } from '../hooks/useTableros';
import { useTablerosClienteStatus, useTablerosClientePend } from '../hooks/useTableros';
import { useTablerosVeterinariaStatus, useTablerosVeteCantidadProfesionales, useTablerosHistoricoMeetsVete, useTablerosVetePagosConcretados } from '../hooks/useTableros';
import { useTablerosAdmin_ControlUsuario } from '../hooks/useTableros';

// Imports para Graficos de barra
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------
export default function HomePage() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [ vKPI_ProfCantidadConsultasPendientes, setKPI_ProfCantidadConsultasPendientes ] = useState(0);
  const [ vKPI_ProfPagosConcretados, setKPI_ProfPagosConcretados ] = useState(0);
  const [ vKPI_ProfPagosConcretadosVete, setKPI_ProfPagosConcretadosVete ] = useState(0);
  const [ vKPI_CliCantidadConsultasPendientes, setKPI_CliCantidadConsultasPendientes ] = useState(0);
  const [ vKPI_VetCantidadProfesionales, setKPI_VetCantidadProfesionales ] = useState(0);
  const welcomeText = `¡Bienvenido a VETLY!`;
  const [usuario, setUsuario] = useState(null);

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
  const { GLOBALVetly } = useContext(UserContext);
  useEffect(() => {
    setUsuario(GLOBALVetly.id);
  }, [GLOBALVetly.id]);

  
    // CARGAR LAS MÉTRICAS DEL PROFESIONAL----------------------------------------------
    // METRICA 1: CANTIDAD DE MEETS PENDIENTES
        const { KPIConsultas, actualizarKPI } = useTableros(usuario);
        const [solicitudesLoaded, setsolicitudesLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPI(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesLoaded(true);
          }

          // Verificar si KPIConsultas está disponible
          if (KPIConsultas !== null) {
            // Realizar operaciones con KPIConsultas aquí
            setKPI_ProfCantidadConsultasPendientes(KPIConsultas.consultas_pendientes);
          }
        }, [solicitudesLoaded, KPIConsultas, usuario, GLOBALVetly.id]);
  

        // METRICA 2: CANTIDAD DE MEETS HISTORICO
        const { KPIHistoricoMeets, actualizarKPIHistoricoMeets } = useTablerosHistoricoMeets(usuario);
        const [solicitudesHistLoaded, setsolicitudesHistLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIHistoricoMeets(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesHistLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesHistLoaded(true);
          }

        }, [solicitudesHistLoaded, KPIHistoricoMeets, usuario, GLOBALVetly.id]);

        
        // METRICA 3: STATUS PERFIL PROFESIONAL
        const { KPIProfStatusPerfil, actualizarKPIProfStatusPerfil } = useTablerosProfStatus(usuario);
        const [solicitudesProfStatusPLoaded, setsolicitudesProfStatusPLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIProfStatusPerfil(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesProfStatusPLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesProfStatusPLoaded(true);
          }

        }, [solicitudesProfStatusPLoaded, KPIProfStatusPerfil, usuario, GLOBALVetly.id]);
        
        //Funcionpara sumarizar las propiedades para el grafico de Barra de progreso
        function calcularPorcentajeTotal(KPIProfStatusPerfil) {
          // Filtrar las propiedades no deseadas
          const propiedadesDeseadas = Object.keys(KPIProfStatusPerfil).filter(
            (key) => key !== 'id' && key !== 'id_Usuario'
          );
        
          // Sumar los porcentajes de las propiedades deseadas
          const total = propiedadesDeseadas.reduce((acc, key) => acc + KPIProfStatusPerfil[key], 0);
          return total;
        }

        // METRICA 4: CANTIDAD DE PAGOS CONCRETADOS
        const { KPIPagosConcretados, actualizarKPIPagosConcretados } = useTablerosProfPagosConcretados(usuario);
        const [solicitudesPagosLoaded, setsolicitudesPagosLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIPagosConcretados(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesPagosLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesPagosLoaded(true);
          }

          // Verificar si KPIPagosConcretados está disponible
          if (KPIPagosConcretados !== null) {
            // Realizar operaciones con KPIConsultas aquí
            setKPI_ProfPagosConcretados(KPIPagosConcretados.pagos_Acumulados_mesActual );
          }
        }, [solicitudesPagosLoaded, KPIPagosConcretados, usuario, GLOBALVetly.id]);

        

  //------------------------------------------------------------------------------------
  // CLIENTES

          // METRICA 1: STATUS PERFIL VETERINARIA
          const { KPIClienteStatusPerfil, actualizarKPIClienteStatusPerfil } = useTablerosClienteStatus(usuario);
          const [solicitudesCliStatusPLoaded, setsolicitudesCliStatusPLoaded] = useState(false);
  
          useEffect(() => {
            if (usuario !== null) {
              actualizarKPIClienteStatusPerfil(usuario);
            }
          }, [usuario]);
  
          useEffect(() => {

            if (!solicitudesCliStatusPLoaded) {
              
              // Este efecto se ejecutará solo una vez al cargar la página
              setsolicitudesCliStatusPLoaded(true);
            }
  
          }, [solicitudesCliStatusPLoaded, KPIClienteStatusPerfil, usuario, GLOBALVetly.id]);
          
          //Funcionpara sumarizar las propiedades para el grafico de Barra de progreso
          function calcularPorcentajeTotalCliente(KPIClienteStatusPerfil) {
            // Filtrar las propiedades no deseadas
            const propiedadesDeseadas = Object.keys(KPIClienteStatusPerfil).filter(
              (key) => key !== 'id' && key !== 'id_Usuario'
            );
          
            // Sumar los porcentajes de las propiedades deseadas
            const totalCliente = propiedadesDeseadas.reduce((acc, key) => acc + KPIClienteStatusPerfil[key], 0);
            return totalCliente;
          }

         // METRICA 2: CANTIDAD DE MEETS PENDIENTES
        const { KPIConsultasClientePend, actualizarKPIClientePend } = useTablerosClientePend(usuario);
        const [solicitudesCliPendLoaded, setsolicitudesCliPendLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIClientePend(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesCliPendLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesCliPendLoaded(true);
          }

          // Verificar si KPIConsultasClientePend está disponible
          if (KPIConsultasClientePend !== null) {
            // Realizar operaciones con KPIConsultas aquí
            setKPI_CliCantidadConsultasPendientes(KPIConsultasClientePend.consultas_pendientes);
          }
        }, [solicitudesCliPendLoaded, KPIConsultasClientePend, usuario, GLOBALVetly.id]);

  
          
//------------------------------------------------------------------------------------
  // VETERINARIA

          // METRICA 1: STATUS PERFIL VETERINARIA
          const { KPIVeterinariaStatusPerfil, actualizarKPIVeterinariaStatusPerfil } = useTablerosVeterinariaStatus(usuario);
          const [solicitudesVetStatusPLoaded, setsolicitudesVetStatusPLoaded] = useState(false);
  
          useEffect(() => {
            if (usuario !== null) {
              actualizarKPIVeterinariaStatusPerfil(usuario);
            }
          }, [usuario]);
  
          useEffect(() => {

            if (!solicitudesVetStatusPLoaded) {
              
              // Este efecto se ejecutará solo una vez al cargar la página
              setsolicitudesVetStatusPLoaded(true);
            }
  
          }, [solicitudesVetStatusPLoaded, KPIVeterinariaStatusPerfil, usuario, GLOBALVetly.id]);
          
          //Funcionpara sumarizar las propiedades para el grafico de Barra de progreso
          function calcularPorcentajeTotalVeterinaria(KPIVeterinariaStatusPerfil) {
            // Filtrar las propiedades no deseadas
            const propiedadesDeseadas = Object.keys(KPIVeterinariaStatusPerfil).filter(
              (key) => key !== 'id' && key !== 'id_Usuario'
            );
          
            // Sumar los porcentajes de las propiedades deseadas
            const totalVeterinaria = propiedadesDeseadas.reduce((acc, key) => acc + KPIVeterinariaStatusPerfil[key], 0);
            return totalVeterinaria;
          }


        // METRICA 2: CANTIDAD DE PROFESIONALES
        const { KPIConsultasVeteCantProfesionales, actualizarKPIVeteCantProf } = useTablerosVeteCantidadProfesionales(usuario);
        const [solicitudesVetCantProfLoaded, setsolicitudesVetCantProfLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIVeteCantProf(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesVetCantProfLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesVetCantProfLoaded(true);
          }

          // Verificar si KPIConsultasVeteCantProfesionales está disponible
          if (KPIConsultasVeteCantProfesionales !== null) {
            // Realizar operaciones con KPIConsultas aquí
            setKPI_VetCantidadProfesionales(KPIConsultasVeteCantProfesionales.cantidad_Profesionales);
          }
        }, [solicitudesVetCantProfLoaded, KPIConsultasVeteCantProfesionales, usuario, GLOBALVetly.id]);


         // METRICA 3: CANTIDAD DE MEETS HISTORICO
                const { KPIHistoricoMeetsVete, actualizarKPIHistoricoMeetsVete } = useTablerosHistoricoMeetsVete(usuario);
                const [solicitudesHistVeteLoaded, setsolicitudesHistVeteLoaded] = useState(false);
        
                useEffect(() => {
                  if (usuario !== null) {
                    actualizarKPIHistoricoMeetsVete(usuario);
                  }
                }, [usuario]);
        
                useEffect(() => {
        
                  if (!solicitudesHistVeteLoaded) {
                    
                    // Este efecto se ejecutará solo una vez al cargar la página
                    setsolicitudesHistVeteLoaded(true);
                  }
        
                }, [solicitudesHistVeteLoaded, KPIHistoricoMeetsVete, usuario, GLOBALVetly.id]);
        
        
        // METRICA 4: CANTIDAD DE PAGOS CONCRETADOS
        const { KPIConsultasPagosVete, actualizarKPIPagosConcretadosVete } = useTablerosVetePagosConcretados(usuario);
        const [solicitudesPagosVeteLoaded, setsolicitudesPagosVeteLoaded] = useState(false);

        useEffect(() => {
          if (usuario !== null) {
            actualizarKPIPagosConcretadosVete(usuario);
          }
        }, [usuario]);

        useEffect(() => {

          if (!solicitudesPagosVeteLoaded) {
            
            // Este efecto se ejecutará solo una vez al cargar la página
            setsolicitudesPagosVeteLoaded(true);
          }

          // Verificar si KPIPagosConcretados está disponible
          if (KPIConsultasPagosVete !== null) {
            // Realizar operaciones con KPIConsultas aquí
            setKPI_ProfPagosConcretadosVete(KPIConsultasPagosVete.pagos_Acumulados_mesActual );
          }
        }, [solicitudesPagosVeteLoaded, KPIConsultasPagosVete, usuario, GLOBALVetly.id]);

  //------------------------------------------------------------------------------------
  // ADMINISTRADOR

          // METRICA 1: CONTROL USUARIOS
          const { KPIAdministradorControlUsuario, actualizarKPI_AdminControlUsuario } = useTablerosAdmin_ControlUsuario(usuario);
          const [solicitudesAdminControlUsuarioLoaded, setsolicitudesAdminControlUsuario] = useState(false);
          const [AdminCantidadUsuarios, setAdminCantidadUsuarios] = useState(null);

          useEffect(() => {
            if (usuario !== null) {
              actualizarKPI_AdminControlUsuario(usuario);           
            }
          }, [usuario]);
  
          useEffect(() => {

            if (!solicitudesAdminControlUsuarioLoaded) {
              
              // Este efecto se ejecutará solo una vez al cargar la página
              setsolicitudesAdminControlUsuario(true);
            }
  
            if (KPIAdministradorControlUsuario !== null && KPIAdministradorControlUsuario[0] !== undefined) {
              const cantidaD_USUARIOS = KPIAdministradorControlUsuario[0].cantidaD_USUARIOS;
              if (cantidaD_USUARIOS !== undefined) {
                
                setAdminCantidadUsuarios(cantidaD_USUARIOS);
              } 
            } 
          }, [solicitudesAdminControlUsuarioLoaded, KPIAdministradorControlUsuario, usuario, GLOBALVetly.id]);


  
  return (
    <section className='flex flex-col gap-3 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <div className='flex flex-col w-full md:w-auto'>
        <Route path='/'>
          <h2 className='w-full text-center text-xl font-bold py-10 md:text-3xl'>
              <FormattedMessage id="tableros.Bienvenida" defaultMessage={welcomeText}/>
          </h2>
        </Route>

        <div className='row justify-content-center'>
          
        {GLOBALVetly.type === 'PROFESIONAL' && (
              <div className='col-md-6 mb-4'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>
                        <FormattedMessage id="tableros.perfil" defaultMessage="COMPLETITUD DE PERFIL"/>
                    </h5>
                    {KPIProfStatusPerfil ? (
                      <div>
                        <div className='progress'>
                          <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${calcularPorcentajeTotal(KPIProfStatusPerfil)}%` }}
                            aria-valuenow={calcularPorcentajeTotal(KPIProfStatusPerfil)}
                            aria-valuemin='0'
                            aria-valuemax='100'
                          >
                            {calcularPorcentajeTotal(KPIProfStatusPerfil)}%
                          </div>
                        </div>
                        {KPIProfStatusPerfil.tarifa === 0 && (
                            <p className='text-danger mt-2'>
                              Requiere estipular la Tarifa para que su perfil sea visible
                            </p>
                          )}
                      </div>
                    ) : (
                      <p className='card-text'>Cargando...</p>
                    )}
                  </div>
                </div>
              </div>
            )}


          {GLOBALVetly.type === 'PROFESIONAL' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.turnos" defaultMessage="CONSULTAS PENDIENTES"/>
                  </h5>
                  {KPIConsultas !== null ? (
                    <div className='KPIblue-text'>
                      <p className='card-text'>{KPIConsultas.consultas_pendientes}</p>
                    </div>
                  ) : (
                    <p className='card-text'>...</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {GLOBALVetly.type === 'PROFESIONAL' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.historico" defaultMessage="HISTÓRICO DE MEETS"/>
                  </h5>
                  {KPIHistoricoMeets !== null ? (
                    <div className='chart-container'>
                      <Bar
                            data={{
                              labels: KPIHistoricoMeets.map((item) => item.mes), // Valores para el eje x
                              datasets: [
                                {
                                  label: 'Cantidad de Consultas',
                                  data: KPIHistoricoMeets.map((item) => item.cantidad_Consultas), // Valores para el eje Y
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




          {GLOBALVetly.type === 'PROFESIONAL' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.pagos" defaultMessage="PAGOS CONCRETADOS (MES ACTUAL)"/>
                  </h5>
                  <div className='KPIblue-text'>
                    <p className='card-text'>
                      {KPIPagosConcretados !== null && KPIPagosConcretados !== undefined
                        ? `$${KPIPagosConcretados.pagos_Acumulados_mesActual !== null && KPIPagosConcretados.pagos_Acumulados_mesActual !== undefined
                          ? `${KPIPagosConcretados.pagos_Acumulados_mesActual}`
                          : '$0'}`
                        : '$0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}




          {GLOBALVetly.type === 'CLIENTE' && (
              <div className='col-md-6 mb-4'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>
                          <FormattedMessage id="tableros.perfil" defaultMessage="COMPLETITUD DE PERFIL"/>
                      </h5>
                    {KPIClienteStatusPerfil ? (
                      <div>
                        <div className='progress'>
                          <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${calcularPorcentajeTotalCliente(KPIClienteStatusPerfil)}%` }}
                            aria-valuenow={calcularPorcentajeTotalCliente(KPIClienteStatusPerfil)}
                            aria-valuemin='0'
                            aria-valuemax='100'
                          >
                            {calcularPorcentajeTotalCliente(KPIClienteStatusPerfil)}%
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className='card-text'>Cargando...</p>
                    )}
                  </div>
                </div>
              </div>
            )}


            {GLOBALVetly.type === 'CLIENTE' && (
                        <div className='col-md-6 mb-4'>
                          <div className='card bg-light-blue'>
                            <div className='card-body KPIcentered bg-light-blue'>
                              <h5 className='card-title'>
                                    <FormattedMessage id="tableros.turnos" defaultMessage="CONSULTAS PENDIENTES"/>
                              </h5>
                              {KPIConsultasClientePend !== null ? (
                                <div className='KPIblue-text'>
                                  <p className='card-text'>{KPIConsultasClientePend.consultas_pendientes}</p>
                                </div>
                              ) : (
                                <p className='card-text'>Cargando...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

          {GLOBALVetly.type === 'VETERINARIA' && (
            <div className='col-md-6 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.perfil" defaultMessage="COMPLETITUD DE PERFIL"/>
                  </h5>
                  {KPIVeterinariaStatusPerfil ? (
                    <div>
                      <div className='progress'>
                        <div
                          className='progress-bar'
                          role='progressbar'
                          style={{ width: `${calcularPorcentajeTotalVeterinaria(KPIVeterinariaStatusPerfil)}%` }}
                          aria-valuenow={calcularPorcentajeTotalVeterinaria(KPIVeterinariaStatusPerfil)}
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          {calcularPorcentajeTotalVeterinaria(KPIVeterinariaStatusPerfil)}%
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className='card-text'>Cargando...</p>
                  )}
                </div>
              </div>
            </div>
          )}


              {GLOBALVetly.type === 'VETERINARIA' && (
                        <div className='col-md-6 mb-4'>
                          <div className='card bg-light-blue'>
                            <div className='card-body KPIcentered bg-light-blue'>
                              <h5 className='card-title'>
                                    <FormattedMessage id="tableros.activo" defaultMessage="PROFESIONALES ACTIVOS"/>
                              </h5>
                              {KPIConsultasVeteCantProfesionales !== null ? (
                                <div className='KPIblue-text'>
                                  <p className='card-text'>{KPIConsultasVeteCantProfesionales.cantidad_Profesionales}</p>
                                </div>
                              ) : (
                                <p className='card-text'>Cargando...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}



            {GLOBALVetly.type === 'VETERINARIA' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.historico" defaultMessage="HISTÓRICO DE MEETS"/>
                  </h5>
                  {KPIHistoricoMeetsVete !== null ? (
                    <div className='chart-container'>
                      <Bar
                            data={{
                              labels: KPIHistoricoMeetsVete.map((item) => item.mes), // Valores para el eje x
                              datasets: [
                                {
                                  label: 'Cantidad de Consultas',
                                  data: KPIHistoricoMeetsVete.map((item) => item.cantidad_Consultas), // Valores para el eje Y
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



          {GLOBALVetly.type === 'VETERINARIA' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.pagos" defaultMessage="PAGOS CONCRETADOS (MES ACTUAL)"/>
                  </h5>
                  <div className='KPIblue-text'>
                    <p className='card-text'>
                      {KPIConsultasPagosVete !== null && KPIConsultasPagosVete !== undefined
                        ? `$${KPIConsultasPagosVete.pagos_Acumulados_mesActual !== null && KPIConsultasPagosVete.pagos_Acumulados_mesActual !== undefined
                          ? `${KPIConsultasPagosVete.pagos_Acumulados_mesActual}`
                          : '$0'}`
                        : '$0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}



          {GLOBALVetly.type === 'ADMIN' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.cantidadUsuarios" defaultMessage="CANTIDAD DE USUARIOS"/>
                  </h5>
                  {KPIAdministradorControlUsuario !== null && KPIAdministradorControlUsuario[0] !== undefined ? (
                    <div className='KPIblue-text'>
                      <p className='card-text'>{KPIAdministradorControlUsuario[0].cantidaD_USUARIOS}</p>
                    </div>
                  ) : (
                    <p className='card-text'>...</p>
                  )}
                </div>
              </div>
            </div>
          )}



          {GLOBALVetly.type === 'ADMIN' && (
            <div className='col-md-6 mb-4'>
              <div className='card bg-light-blue'>
                <div className='card-body KPIcentered bg-light-blue'>
                  <h5 className='card-title'>
                        <FormattedMessage id="tableros.logueados" defaultMessage="USUARIOS LOGUEADOS"/>
                  </h5>
                  {KPIAdministradorControlUsuario !== null && KPIAdministradorControlUsuario[0] !== undefined ? (
                    <div className='KPIblue-text'>
                      <p className='card-text'>{KPIAdministradorControlUsuario[0].usuarioS_ACTIVOS}</p>
                    </div>
                  ) : (
                    <p className='card-text'>...</p>
                  )}
                </div>
              </div>
            </div>
          )}


            {GLOBALVetly.type === 'ADMIN' && (
              <div className='col-md-6 mb-4'>
                <div className='card bg-light-blue'>
                  <div className='card-body KPIcentered bg-light-blue'>
                    <h5 className='card-title'>
                            <FormattedMessage id="tableros.granularidad" defaultMessage="GRANULARIDAD DE TIPOS DE USUARIOS"/>
                    </h5>
                    {KPIAdministradorControlUsuario !== null && KPIAdministradorControlUsuario[0] !== undefined ? (
                      <div className='chart-container'>
                        <Bar
                          data={{
                            labels: ['Clientes', 'Profesionales', 'Veterinarias', 'Administradores'],
                            datasets: [
                              {
                                label: 'Cantidad',
                                data: [
                                  KPIAdministradorControlUsuario[0].cantidaD_CLIENTES,
                                  KPIAdministradorControlUsuario[0].cantidaD_PROFESIONALES,
                                  KPIAdministradorControlUsuario[0].cantidaD_VETERINARIAS,
                                  KPIAdministradorControlUsuario[0].cantidaD_ADMINISTRADORES,
                                ],
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
          </div>
        </section>
      );
    }




