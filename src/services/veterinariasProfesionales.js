// veterinariasProfesionales.js

// Recibe el ID(Usuario) del profesional y retorna las Veterinarias de dicho Profesional
const API_URL = import.meta.env.VITE_API_URL;

export async function GetVeterinariasDelProfesionalByUser(id) {
  const endpoint = '/api/VeterinariaProfesional/getVeterinariasProfesionalDetalleByUsuario';
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
      throw new Error('Error al obtener las veterinarias');
    }

    const veterinariasProf = await response.json();

    return veterinariasProf;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}



export async function RegistrarVeterinariaProfesional(UsuarioId, veterinariaProfesional) {
  const endpoint = '/api/VeterinariaProfesional/RegistrarVeterinariaProfesional';
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
      throw new Error('Error al Insertar la relación Veterinaria Profesional');
    }

    return response;
  } catch (error) {
    throw error;
  }
}


export async function GetVeterinaraProfesionalByVP(veterinaria, idProfesional) {
  const endpoint = '/api/VeterinariaProfesional/getVPByVeterinariayProfesionalPOST';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ProfesionalId': idProfesional,
        },
        body: JSON.stringify({
          ...veterinaria, // Todos los campos de veterinaria en el cuerpo
        }),
      });

    if (!response.ok) {
      throw new Error('Error al obtener la relación Veterinaria-Profesional');
    }

    // Agrego éste check por si la respuesta es vacia
    if (response.status === 204) {
      return null; // Or an appropriate value to indicate no data.
    }

    const veterinariasProf = await response.json();

    return veterinariasProf;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
