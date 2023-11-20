// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetSexos() {
  const endpoint = '/api/DimensionesGenerales/getSexo';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener los Sexos');
    }

    const sexos = await response.json();
    return sexos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
