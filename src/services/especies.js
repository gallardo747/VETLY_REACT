// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetEspecies() {
  const endpoint = '/api/DimensionesGenerales/getEspecies';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las Especies');
    }

    const especies = await response.json();
    return especies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
