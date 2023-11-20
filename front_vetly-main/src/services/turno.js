// mascotas.js

// Recibe el ID DE USUARIO para filtrar las mascotas

const API_URL = import.meta.env.VITE_API_URL;
export async function RegistrarTurno(UsuarioId, mascota, turno, token) {
  const endpoint = '/api/ConsultaProfesional/RegistrarConsultaProfesional';
  const apiUrl = `${API_URL}${endpoint}`;
  try {


    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'UsuarioId': UsuarioId,
        'idMascota': mascota,
      },
      body: JSON.stringify({
        ...turno, // Todos los campos de turno en el cuerpo
      }),
    });


    if (!response.ok) {
      // Extraer más detalles del error
      const errorResponse = await response.text(); // Obtener el cuerpo del mensaje de error
      console.error('Error al registrar el Turno:', response.status, response.statusText, errorResponse);
      throw new Error('Error al registrar el Turno');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// Ingresa oor Parametro el Profesional y retorna todos los Turnos desde HOY en adelante
export async function GetTurnosTomadosByProfesionales(id) {
  const endpoint = '/api/ConsultaProfesional/GetTurnosTomadosByProfesional';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });

    if (!response.ok) {
      throw new Error('Error al obtener los Turnos Tomados por el Profesional');
    }

    const turnos = await response.json();
    return turnos;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
