// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetCiudades() {
  const endpoint = '/api/DimensionesGenerales/getCiudades';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las Ciudades');
    }

    const ciudades = await response.json();
    return ciudades;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
