
const API_URL = import.meta.env.VITE_API_URL;

export async function ActualizarFamilia_Patente(UsuarioId, familiaPatente) {
  const endpoint = '/api/DimensionesGenerales/ActualizarFamiliaPatente_PermisosAdmin';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UsuarioId': UsuarioId,
      },
      body: JSON.stringify({
        ...familiaPatente, // Todos los campos de mascota en el cuerpo
      }),
    });


    if (!response.ok) {
      throw new Error('Error al actualizar la Familia Patente');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}