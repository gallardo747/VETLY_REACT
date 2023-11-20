// bitacoras.js

// Recibe el ID(Usuario) para devolver las bitacoras

const API_URL = import.meta.env.VITE_API_URL;

export async function GetBitacoras(id) {
  const endpoint = '/api/Bitacora/getBitacoraByUsuario';
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });

    if (!response.ok) {
      throw new Error('Error al obtener las Bitacoras');
    }

    const bitacoras = await response.json();

    return bitacoras;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
