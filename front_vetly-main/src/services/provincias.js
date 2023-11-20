// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetProvincias() {
  const endpoint = '/api/DimensionesGenerales/getProvincias';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las Provincias');
    }

    const provincias = await response.json();
    return provincias;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
