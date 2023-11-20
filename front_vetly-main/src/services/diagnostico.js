// mascotas.js

// Recibe el ID DE USUARIO para filtrar las mascotas

const API_URL = import.meta.env.VITE_API_URL;

export async function GetDiagnostico() {
    const endpoint = '/api/Diagnostico/getDiagnostico';
    const apiUrl = `${API_URL}${endpoint}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Error al obtener los Diagnosticos');
      }
  
      const diagnostico = await response.json();
      return diagnostico;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
export async function RegistrarDiagnostico(UsuarioId, diagnostico) {
  const endpoint = '/api/Diagnostico/RegistrarDiagnostico';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...diagnostico, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al registrar el Diagnostico');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ActualizarDiagnostico(UsuarioId, diagnostico) {
  const endpoint = '/api/Diagnostico/ActualizarDiagnostico';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...diagnostico, 
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar la diagnostico');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}