// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetEspecialidad() {
  const endpoint = '/api/Especialidad/getEspecialidad';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las Especialidades');
    }

    const especialidad = await response.json();
    return especialidad;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
