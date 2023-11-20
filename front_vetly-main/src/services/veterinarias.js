// veterinarias.js

const API_URL = import.meta.env.VITE_API_URL;

export async function GetVeterinarias() {
  const endpoint = '/api/Veterinarias/getVeterinarias';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener las veterinarias');
    }

    const veterinarias = await response.json();
    return veterinarias;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function UpdateVeterinaria(UsuarioId, veterinaria, token) {
  const endpoint = '/api/Veterinarias/ActualizarVeterinaria';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...veterinaria, // Todos los campos de veterinaria en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar el Profesional');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}