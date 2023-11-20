// mascotas.js

// Recibe el ID DE USUARIO para filtrar las mascotas

const API_URL = import.meta.env.VITE_API_URL;

export async function GetMascotasByUser(email, token) {
  const endpoint = '/api/Mascota/getMascotaDetalleByUsuario';
  const apiUrl = `${API_URL}${endpoint}`;
  //console.log(token);

  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Utiliza el token JWT almacenado en GLOBALVetly.token
        },
        body: JSON.stringify({ email })
      });

    const mascotas = await response.json();
    
    return mascotas;
  } catch (error) {
    throw error;
  }
}

export async function RegistrarMascota(UsuarioId, mascota, token) {
  const endpoint = '/api/Mascota/RegistrarMascota';
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
        ...mascota, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al registrar la mascota');
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function ActualizarMascota(UsuarioId, mascota, token) {
  const endpoint = '/api/Mascota/ActualizarMascota';
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
        ...mascota, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar la mascota');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}