// Especialidad.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetArbolML() {
  const endpoint = '/api/ML_Autodiagnostico/geArbolDecision';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener Arbol de Decisión');
    }

    const Arboldiagnostico = await response.json();
    
    return Arboldiagnostico;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
