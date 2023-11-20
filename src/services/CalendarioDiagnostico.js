
// Recibe el ID(Usuario) para devolver las agendas

const API_URL = import.meta.env.VITE_API_URL;

export async function GetCalendarioDiagnostico(id, fechaAtencionInt) {
  const endpoint = '/api/ConsultaProfesional/GetCalendarioMeetingsProfesionalConDiagnostico';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'FechaInt': fechaAtencionInt,
          },
        body: JSON.stringify({ id: id  })
      });

    if (!response.ok) {
      throw new Error('Error al obtener el Calendario y sus diagnósticos');
    }

    const calendario = await response.json();
    return calendario;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
