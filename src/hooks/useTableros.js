import { useState, useEffect } from 'react';
import { GetKPIProfesionalConsultasPendientes } from '../services/tableros';
import { GetKPIProfesionalCantidadConsultas } from '../services/tableros';
import { GetKPIProfesionalStatusPerfil } from '../services/tableros';
import { GetKPIProfesionalPagosAcumulados } from '../services/tableros';
import { GetKPIClienteStatusPerfil } from '../services/tableros';
import { GetKPIVeterinariaStatusPerfil } from '../services/tableros';
import { GetKPIClienteConsultasPendientes } from '../services/tableros';
import { GetKPIVeterinariaCantidadProfesionales } from '../services/tableros';
import { GetKPIVeterinariaCantidadConsultas } from '../services/tableros';
import { GetKPIVeterinariaPagosAcumulados } from '../services/tableros';
import { GetKPIVeterinariaAñoMes_Consultas } from '../services/tableros';
import { GetKPIVeterinaria_ProfesionalesIncorporados } from '../services/tableros';
import { GetKPIVeterinaria_PagosHistorico } from '../services/tableros';
import { GetKPIAdministrador_ControlUsuario } from '../services/tableros';
import { GetKPICliente_Diagnosticos, GetKPIProfesional_Pagos, GetKPIVeterinaria_Turnos } from '../services/tableros';
import { GetKPIAdmin_ControlPermisos_WithNames, GetKPIAdmin_ControlPermisos, GetKPIAdmin_ControlExcepciones, GetKPIAdmin_ControlExcepcionesMes } from '../services/tableros';


export function useTableros(id) {
  const [KPIConsultas, setKPIConsultas] = useState([]);

      // Función para actualizar la devolución de profesionales
      const actualizarKPI = async (newId) => {
        try {
          const fetchedKPIConsultas = await GetKPIProfesionalConsultasPendientes(newId);
          setKPIConsultas(fetchedKPIConsultas);
        } catch (error) {
          console.error('Error:', error);
        }
      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedKPIConsultas = await GetKPIProfesionalConsultasPendientes(id);
        setKPIConsultas(fetchedKPIConsultas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { KPIConsultas, actualizarKPI };
}


export function useTablerosHistoricoMeets(id) {
    const [KPIHistoricoMeets, setKPIHistoricoMeets] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIHistoricoMeets = async (newId) => {
          try {
            const fetchedKPIHistoricoMeets = await GetKPIProfesionalCantidadConsultas(newId);
            setKPIHistoricoMeets(fetchedKPIHistoricoMeets);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIHistoricoMeets = await GetKPIProfesionalCantidadConsultas(id);
          setKPIHistoricoMeets(fetchedKPIHistoricoMeets);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIHistoricoMeets, actualizarKPIHistoricoMeets };
  }


  export function useTablerosProfStatus(id) {
    const [KPIProfStatusPerfil, setKPIProfStatusPerfil] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIProfStatusPerfil = async (newId) => {
          try {
            const fetchedKPIProfStatusPerfil = await GetKPIProfesionalStatusPerfil(newId);
            setKPIProfStatusPerfil(fetchedKPIProfStatusPerfil);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIProfStatusPerfil = await GetKPIProfesionalStatusPerfil(id);
          setKPIProfStatusPerfil(fetchedKPIProfStatusPerfil);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIProfStatusPerfil, actualizarKPIProfStatusPerfil };
  }


  export function useTablerosProfPagosConcretados(id) {
    const [KPIPagosConcretados, setKPIPagosConcretados] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIPagosConcretados = async (newId) => {
          try {
            const fetchedKPIPagosConcretados = await GetKPIProfesionalPagosAcumulados(newId);
            setKPIPagosConcretados(fetchedKPIPagosConcretados);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIPagosConcretados = await GetKPIProfesionalPagosAcumulados(id);
          setKPIPagosConcretados(fetchedKPIPagosConcretados);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIPagosConcretados, actualizarKPIPagosConcretados };
  }

  export function useTablerosClienteStatus(id) {
    const [KPIClienteStatusPerfil, setKPIClienteStatusPerfil] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIClienteStatusPerfil = async (newId) => {
          try {
            const fetchedKPIClienteStatusPerfil = await GetKPIClienteStatusPerfil(newId);
            setKPIClienteStatusPerfil(fetchedKPIClienteStatusPerfil);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIClienteStatusPerfil = await GetKPIClienteStatusPerfil(id);
          setKPIClienteStatusPerfil(fetchedKPIClienteStatusPerfil);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIClienteStatusPerfil, actualizarKPIClienteStatusPerfil };
  }



  export function useTablerosVeterinariaStatus(id) {
    const [KPIVeterinariaStatusPerfil, setKPIVeterinariaStatusPerfil] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIVeterinariaStatusPerfil = async (newId) => {
          try {
            const fetchedKPIVeterinariaStatusPerfil = await GetKPIVeterinariaStatusPerfil(newId);
            setKPIVeterinariaStatusPerfil(fetchedKPIVeterinariaStatusPerfil);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIVeterinariaStatusPerfil = await GetKPIVeterinariaStatusPerfil(id);
          setKPIVeterinariaStatusPerfil(fetchedKPIVeterinariaStatusPerfil);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIVeterinariaStatusPerfil, actualizarKPIVeterinariaStatusPerfil };
  }



  export function useTablerosClientePend(id) {
    const [KPIConsultasClientePend, setKPIConsultasClientePend] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIClientePend = async (newId) => {
          try {
            const fetchedKPIConsultasClientePend = await GetKPIClienteConsultasPendientes(newId);
            setKPIConsultasClientePend(fetchedKPIConsultasClientePend);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIConsultasClientePend = await GetKPIClienteConsultasPendientes(id);
          setKPIConsultasClientePend(fetchedKPIConsultasClientePend);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIConsultasClientePend, actualizarKPIClientePend };
  }
  

  export function useTablerosVeteCantidadProfesionales(id) {
    const [KPIConsultasVeteCantProfesionales, setKPIConsultasVeteCantProfesionales] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIVeteCantProf = async (newId) => {
          try {
            const fetchedKPIConsultasVeteCantProf = await GetKPIVeterinariaCantidadProfesionales(newId);
            setKPIConsultasVeteCantProfesionales(fetchedKPIConsultasVeteCantProf);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIConsultasVeteCantProf = await GetKPIVeterinariaCantidadProfesionales(id);
          setKPIConsultasVeteCantProfesionales(fetchedKPIConsultasVeteCantProf);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIConsultasVeteCantProfesionales, actualizarKPIVeteCantProf };
  }


  export function useTablerosHistoricoMeetsVete(id) {
    const [KPIHistoricoMeetsVete, setKPIHistoricoMeetsVete] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIHistoricoMeetsVete = async (newId) => {
          try {
            const fetchedKPIHistoricoMeetsVete = await GetKPIVeterinariaCantidadConsultas(newId);
            setKPIHistoricoMeetsVete(fetchedKPIHistoricoMeetsVete);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIHistoricoMeetsVete = await GetKPIVeterinariaCantidadConsultas(id);
          setKPIHistoricoMeetsVete(fetchedKPIHistoricoMeetsVete);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIHistoricoMeetsVete, actualizarKPIHistoricoMeetsVete };
  }



  export function useTablerosVetePagosConcretados(id) {
    const [KPIConsultasPagosVete, setKPIConsultasPagosVete] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIPagosConcretadosVete = async (newId) => {
          try {
            const fetchedKPIPagosConcretadosVete = await GetKPIVeterinariaPagosAcumulados(newId);
            setKPIConsultasPagosVete(fetchedKPIPagosConcretadosVete);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIPagosConcretadosVete = await GetKPIVeterinariaPagosAcumulados(id);
          setKPIConsultasPagosVete(fetchedKPIPagosConcretadosVete);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIConsultasPagosVete, actualizarKPIPagosConcretadosVete };
  }


  export function useTablerosVeteAñoMes_Consultas(id) {
    const [KPIAñoMesConsultasVete, setKPIAñoMesConsultasVete] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIAñoMesConsultas = async (newId) => {
          try {
            const fetchedKPIAñoMesConsultaVete = await GetKPIVeterinariaAñoMes_Consultas(newId);
            setKPIAñoMesConsultasVete(fetchedKPIAñoMesConsultaVete);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAñoMesConsultaVete = await GetKPIVeterinariaAñoMes_Consultas(id);
          setKPIAñoMesConsultasVete(fetchedKPIAñoMesConsultaVete);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAñoMesConsultasVete, actualizarKPIAñoMesConsultas };
  }


  export function useTablerosVete_ProfesionalesIncorporados(id) {
    const [KPIVeteProfesionalesIncorporados, setKPIVeteProfesionalesIncorporados] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPI_ProfesionalesIncorporados = async (newId) => {
          try {
            const fetchedKPIProfesionalesVete = await GetKPIVeterinaria_ProfesionalesIncorporados(newId);
            setKPIVeteProfesionalesIncorporados(fetchedKPIProfesionalesVete);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIProfesionalesVete = await GetKPIVeterinaria_ProfesionalesIncorporados(id);
          setKPIVeteProfesionalesIncorporados(fetchedKPIProfesionalesVete);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIVeteProfesionalesIncorporados, actualizarKPI_ProfesionalesIncorporados };
  }


  export function useTablerosVete_HistoricoPagos(id) {
    const [KPIVeteHistoricoPagos, setKPIVeteHistoricoPagos] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPI_VeteHistoricoPagos = async (newId) => {
          try {
            const fetchedKPIVetePagosHistoricos = await GetKPIVeterinaria_PagosHistorico(newId);
            setKPIVeteHistoricoPagos(fetchedKPIVetePagosHistoricos);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIVetePagosHistoricos = await GetKPIVeterinaria_PagosHistorico(id);
          setKPIVeteHistoricoPagos(fetchedKPIVetePagosHistoricos);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIVeteHistoricoPagos, actualizarKPI_VeteHistoricoPagos };
  }  



  export function useTablerosAdmin_ControlUsuario(id) {
    const [KPIAdministradorControlUsuario, setKPIAdministradorControlUsuario] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPI_AdminControlUsuario= async (newId) => {
          try {

            const fetchedKPIAdminsControlUsuario = await GetKPIAdministrador_ControlUsuario(newId);
            setKPIAdministradorControlUsuario(fetchedKPIAdminsControlUsuario);
          } catch (error) {
            //console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAdminsControlUsuario = await GetKPIAdministrador_ControlUsuario(id);
          setKPIAdministradorControlUsuario(fetchedKPIAdminsControlUsuario);
        } catch (error) {
          //console.error('Error:', error);
          
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAdministradorControlUsuario, actualizarKPI_AdminControlUsuario };
  }  


  export function useTablerosClien_DIagnosticos(id) {
    const [KPIAClienteDiagnosticos, setKPIAClienteDiagnosticos] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPI_ClienteDiagnosticos= async (newId) => {
          try {

            const fetchedKPIClienDiagnostico = await GetKPICliente_Diagnosticos(newId);
            setKPIAClienteDiagnosticos(fetchedKPIClienDiagnostico);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIClienDiagnostico = await GetKPICliente_Diagnosticos(id);
          setKPIAClienteDiagnosticos(fetchedKPIClienDiagnostico);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAClienteDiagnosticos, actualizarKPI_ClienteDiagnosticos };
  }  

  
  export function useTablerosProf_Pagos(id) {
    const [KPIProfesional_Pagos, setKPIProfesional_Pagos] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIProfesional_Pagos= async (newId) => {
          try {

            const fetchedKPIpROF_pAGOS = await GetKPIProfesional_Pagos(newId);
            setKPIProfesional_Pagos(fetchedKPIpROF_pAGOS);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIpROF_pAGOS = await GetKPIProfesional_Pagos(id);
          setKPIProfesional_Pagos(fetchedKPIpROF_pAGOS);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIProfesional_Pagos, actualizarKPIProfesional_Pagos };
  }  



  export function useTablerosVeter_Turnos(id) {
    const [KPIVeterinaria_TurnosConsolidado, setKPIVeterinaria_TurnosConsolidado] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIVeterinaria_Turnos= async (newId) => {
          try {

            const fetchedKPIVete_Turnos = await GetKPIVeterinaria_Turnos(newId);
            setKPIVeterinaria_TurnosConsolidado(fetchedKPIVete_Turnos);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIVete_Turnos = await GetKPIVeterinaria_Turnos(id);
          setKPIVeterinaria_TurnosConsolidado(fetchedKPIVete_Turnos);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIVeterinaria_TurnosConsolidado, actualizarKPIVeterinaria_Turnos };
  }  


  export function useTablerosAdmin_ControlPermisos() {
    const [KPIAdmin_PermisosControl, setKPIAdmin_PermisosControl] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIAdmin_PermisosControl= async () => {
          try {

            const fetchedKPIAdmin_PermisosControl = await GetKPIAdmin_ControlPermisos_WithNames();
            setKPIAdmin_PermisosControl(fetchedKPIAdmin_PermisosControl);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAdmin_PermisosControl = await GetKPIAdmin_ControlPermisos_WithNames();
          setKPIAdmin_PermisosControl(fetchedKPIAdmin_PermisosControl);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAdmin_PermisosControl, actualizarKPIAdmin_PermisosControl };
  }  




  
  export function useTablerosAdmin_ControlPermisos_Categories() {
    const [KPIAdmin_PermisosFP, setKPIAdmin_PermisosFP] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIAdmin_FPCategories= async () => {
          try {

            const fetchedKPIAdmin_PermisosFP = await GetKPIAdmin_ControlPermisos();
            setKPIAdmin_PermisosFP(fetchedKPIAdmin_PermisosFP);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAdmin_PermisosFP = await GetKPIAdmin_ControlPermisos();
          setKPIAdmin_PermisosFP(fetchedKPIAdmin_PermisosFP);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAdmin_PermisosFP, actualizarKPIAdmin_FPCategories };
  }  


  
  export function useTablerosAdmin_ControlExcepciones() {
    const [KPIAdmin_Excepciones, setKPIAdmin_Excepciones] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIAdmin_Excepciones= async () => {
          try {

            const fetchedKPIAdmin_Excep = await GetKPIAdmin_ControlExcepciones();
            setKPIAdmin_Excepciones(fetchedKPIAdmin_Excep);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAdmin_Excep = await GetKPIAdmin_ControlExcepciones();
          setKPIAdmin_Excepciones(fetchedKPIAdmin_Excep);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAdmin_Excepciones, actualizarKPIAdmin_Excepciones };
  }  




  
  export function useTablerosAdmin_ControlExcepciones_PorMes() {
    const [KPIAdmin_ExcepcionesPorMes, setKPIAdmin_ExcepcionesPorMes] = useState([]);
  
        // Función para actualizar la devolución de profesionales
        const actualizarKPIAdmin_ExcepcionesPorMes= async () => {
          try {

            const fetchedKPIAdmin_ExcepcionesPorMes = await GetKPIAdmin_ControlExcepcionesMes();
            setKPIAdmin_ExcepcionesPorMes(fetchedKPIAdmin_ExcepcionesPorMes);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedKPIAdmin_ExcepcionesPorMes = await GetKPIAdmin_ControlExcepcionesMes();
          setKPIAdmin_ExcepcionesPorMes(fetchedKPIAdmin_ExcepcionesPorMes);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
    }, []);
  
    return { KPIAdmin_ExcepcionesPorMes, actualizarKPIAdmin_ExcepcionesPorMes };
  }  