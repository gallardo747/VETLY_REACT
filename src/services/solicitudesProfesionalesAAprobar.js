const API_URL = import.meta.env.VITE_API_URL;

export async function GetSolicitudesProfesionalesAAprobarByUser(id) {
  const endpoint = '/api/VeterinariaProfesional/getSolicitudesProfesionalAAprobarByUsuario';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })  // Es el ID DEL USUARIO
      });

    if (!response.ok) {
      throw new Error('Error al obtener las Solicitudes');
    }

    const solicitudesProf = await response.json();

    return solicitudesProf;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}



export async function AprobarSolicitudVeterinariaProfesional(UsuarioId, veterinariaProfesional) {
  const endpoint = '/api/VeterinariaProfesional/UpdateSolicitudesProfesionalAAprobar';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...veterinariaProfesional, // Todos los campos de veterinaria en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al Aprobar la solicitud al Profesional');
    }

    return response;
  } catch (error) {
    throw error;
  }
}