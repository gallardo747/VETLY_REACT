// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetPaises() {
  const endpoint = '/api/DimensionesGenerales/getPaises';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener los Países');
    }

    const paises = await response.json();
    return paises;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
