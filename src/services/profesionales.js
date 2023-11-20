// profesionales.js

// Recibe el ID(Usuario) de la VETERINARIA para devolver los profesionales

const API_URL = import.meta.env.VITE_API_URL;

export async function GetProfesionalesByUser(id) {
  const endpoint = '/api/Profesional/GetProfesionalByVeterinaria';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_Usuario: id })
      });

    if (!response.ok) {
      throw new Error('Error al obtener los profesionales');
    }

    const profesionales = await response.json();

    return profesionales;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

// Devuelve todos los profesionales de la veterinaria que ingresa como parámetro
export async function GetProfesionalesByIDVeterinaria(id) {
  const endpoint = '/api/Profesional/GetProfesionalTarifaByVeterinaria';
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
      throw new Error('Error al obtener los profesionales');
    }

    const profesionales = await response.json();

    return profesionales;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function UpdateProfesional(UsuarioId, profesional, token) {
  const endpoint = '/api/profesional/ActualizarProfesional';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...profesional, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar el Profesional');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}