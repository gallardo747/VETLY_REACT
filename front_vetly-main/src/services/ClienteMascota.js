const API_URL = import.meta.env.VITE_API_URL;

export async function GetClienteMascotaByCM(idCliente, idMascota) {
  const endpoint = `/api/VeterinariaProfesional/getCMByClienteyMascota?pClienteId=${idCliente}&pMascotaId=${idMascota}`;
  const apiUrl = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el ClienteMascota');
    }

    const clienteMascota = await response.json();

    return clienteMascota;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
