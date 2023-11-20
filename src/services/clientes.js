// mascotas.js

// Recibe el ID DE USUARIO para filtrar las mascotas

const API_URL = import.meta.env.VITE_API_URL;

export async function ActualizarCliente(UsuarioId, cliente, token) {
  const endpoint = '/api/Cliente/ActualizarCliente';
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
        ...cliente, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar el Cliente');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}