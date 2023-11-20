// veterinariasProfesionales.js

// Recibe el ID(Usuario) del profesional y retorna las Veterinarias de dicho Profesional
const API_URL = import.meta.env.VITE_API_URL;

export async function GetKPIProfesionalConsultasPendientes(id) {
  const endpoint = '/api/Tableros/getKPI_Profesional_ConsultasPendientes';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
      });

    if (!response.ok) {
      throw new Error('Error al obtener las Meets Pendientes');
    }

    // Agrego éste check por si la respuesta es vacia
    if (response.status === 204) {
            return null; // Or an appropriate value to indicate no data.
    }

    const KPIConsultas = await response.json();

    return KPIConsultas;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}


export async function GetKPIProfesionalCantidadConsultas(id) {
    const endpoint = '/api/Tableros/getKPI_Profesional_Cantidad_Consultas';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener la Cantida de Meets Historico');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIHistoricoMeets = await response.json();
  
      return KPIHistoricoMeets;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }


  export async function GetKPIProfesionalStatusPerfil(id) {
    const endpoint = '/api/Tableros/getKPI_Profesional_StatusPerfil';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener la Cantida de Meets Historico');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIProfStatusPerfil = await response.json();
  
      return KPIProfStatusPerfil;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }


  export async function GetKPIProfesionalPagosAcumulados(id) {
    const endpoint = '/api/Tableros/getKPI_Profesional_PAgosAcumuladosMesACtual';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Pagos Concretados');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIConsultas = await response.json();
  
      return KPIConsultas;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }
  

  export async function GetKPIClienteStatusPerfil(id) {
    const endpoint = '/api/Tableros/getKPI_Cliente_StatusPerfil';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener el Status del Perfil');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIClienteStatusPerfil = await response.json();
  
      return KPIClienteStatusPerfil;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }



  export async function GetKPIVeterinariaStatusPerfil(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_StatusPerfil';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener el Status del Perfil');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIVeterinariaStatusPerfil = await response.json();
  
      return KPIVeterinariaStatusPerfil;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }


  export async function GetKPIClienteConsultasPendientes(id) {
    const endpoint = '/api/Tableros/getKPI_Cliente_ConsultasPendientes';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener las Meets Pendientes');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIConsultasClientePend = await response.json();
  
      return KPIConsultasClientePend;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }
  

  export async function GetKPIVeterinariaCantidadProfesionales(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_CantidadProfesionales';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener la Cantidad de Profesionales');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIConsultasVeteCantProfesionales = await response.json();
  
      return KPIConsultasVeteCantProfesionales;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }
  

  export async function GetKPIVeterinariaCantidadConsultas(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_Cantidad_Consultas';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener la Cantidad de Meets Historico');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIHistoricoMeetsVete = await response.json();
  
      return KPIHistoricoMeetsVete;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }


  export async function GetKPIVeterinariaPagosAcumulados(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_PAgosAcumuladosMesACtual';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Pagos Concretados');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIConsultasPagosVete = await response.json();
  
      return KPIConsultasPagosVete;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }


  export async function GetKPIVeterinariaAñoMes_Consultas(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_AñoMes';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Pagos Concretados');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAñoMesConsultasVete = await response.json();
  
      return KPIAñoMesConsultasVete;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }



  export async function GetKPIVeterinaria_ProfesionalesIncorporados(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_ProfesionalesIncorporados';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los profesionales de a Veterinaria');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIVeteProfesionalesIncorporados = await response.json();
  
      return KPIVeteProfesionalesIncorporados;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }



  export async function GetKPIVeterinaria_PagosHistorico(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_PagosHistorico';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener el Histórico de Pagos de la Veterinaria');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIVeteHistoricoPagos = await response.json();
  
      return KPIVeteHistoricoPagos;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }  


  export async function GetKPIAdministrador_ControlUsuario(id) {
    const endpoint = '/api/Tableros/getKPI_Administrador_ControlUsuarios';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener el Control de Usuarios');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAdministradorControlUsuario = await response.json();
  
      return KPIAdministradorControlUsuario;
    } catch (error) {
      throw error;
    }
  }  


  
  export async function GetKPICliente_Diagnosticos(id) {
    const endpoint = '/api/Tableros/getKPI_Cliente_DiagnosticoConsolidado';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Diagnósticos');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAClienteDiagnosticos = await response.json();
  
      return KPIAClienteDiagnosticos;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }  



  

  
  export async function GetKPIProfesional_Pagos(id) {
    const endpoint = '/api/Tableros/getKPI_Profesional_PagosConsolidado';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Pagos');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIProfesional_Pagos = await response.json();
  
      return KPIProfesional_Pagos;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }  



  export async function GetKPIVeterinaria_Turnos(id) {
    const endpoint = '/api/Tableros/getKPI_Veterinaria_Turnos';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_Usuario: id })  // Es el ID DEL USUARIO
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Turnos de la Veterinaria');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIVeterinaria_TurnosConsolidado = await response.json();
  
      return KPIVeterinaria_TurnosConsolidado;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }  



  export async function GetKPIAdmin_ControlPermisos_WithNames() {
    const endpoint = '/api/Tableros/getKPI_Administrador_ControlPermisos_WithNames';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Permisos');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAdmin_PermisosControl = await response.json();
  
      return KPIAdmin_PermisosControl;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }




  export async function GetKPIAdmin_ControlPermisos() {
    const endpoint = '/api/Tableros/getKPI_Administrador_ControlPermisos';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener los Permisos');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAdmin_PermisosFP = await response.json();
  
      return KPIAdmin_PermisosFP;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }



  export async function GetKPIAdmin_ControlExcepciones() {
    const endpoint = '/api/Tableros/getKPI_Administrador_ControlExcepciones';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener las Excepciones');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAdmin_Excepciones = await response.json();
  
      return KPIAdmin_Excepciones;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }



  export async function GetKPIAdmin_ControlExcepcionesMes() {
    const endpoint = '/api/Tableros/getKPI_Administrador_CantidadErroresMes';
    const apiUrl = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
      if (!response.ok) {
        throw new Error('Error al obtener las Excepciones por Mes');
      }
  
      // Agrego éste check por si la respuesta es vacia
      if (response.status === 204) {
              return null; // Or an appropriate value to indicate no data.
      }
  
      const KPIAdmin_ExcepcionesPorMes = await response.json();
  
      return KPIAdmin_ExcepcionesPorMes;
    } catch (error) {
      //console.error(error);
      throw error;
    }
  }