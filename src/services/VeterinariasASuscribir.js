// veterinariasProfesionales.js

// Recibe el ID(Usuario) del profesional y retorna las Veterinarias de dicho Profesional
const API_URL = import.meta.env.VITE_API_URL;

export async function GetVeterinarias(id) {
  const endpoint = '/api/VeterinariaProfesional/getVeterinariasProfesionalASuscribir';
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

    const veterinarias = await response.json();

    return veterinarias;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
