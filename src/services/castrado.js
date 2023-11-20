// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetCastrado() {
  const endpoint = '/api/DimensionesGenerales/getCastrado';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener la dimensión Castrado');
    }

    const castrado = await response.json();
    return castrado;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
