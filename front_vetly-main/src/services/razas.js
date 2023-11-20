// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetRazas() {
  const endpoint = '/api/DimensionesGenerales/getRazas';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las Razas');
    }

    const razas = await response.json();
    return razas;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
