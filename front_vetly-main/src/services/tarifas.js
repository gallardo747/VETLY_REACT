// mascotas.js

// Recibe el ID DE USUARIO y LA VETERINARIA

const API_URL = import.meta.env.VITE_API_URL;

export async function GetTarifaByProfesionalAndVeterinaria(profesional, Idveterinaria) {
  const endpoint = '/api/ProfesionalTarifa/getPTByProfesional';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'idVeterinaria':Idveterinaria,
        },
        body: JSON.stringify({ ...profesional  })
      });


    if (!response.ok) {
      throw new Error('Error al obtener la Tarifa');
    }

     // Agrego éste check por si la respuesta es vacia
     if (response.status === 204) {
      return null; // Or an appropriate value to indicate no data.
    }

    const tarifa = await response.json();
    
    return tarifa;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function RegistrarTarifa(UsuarioId, tarifa, id_Veterinaria) {
  const endpoint = '/api/ProfesionalTarifa/RegistrarProfesionalTarifa';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UsuarioId': UsuarioId,
        'idVeterinaria': id_Veterinaria
      },
      body: JSON.stringify({
        ...tarifa, // Todos los campos de tarifa en el cuerpo
      }),
    });


    if (!response.ok) {
      console.log(response);
      throw new Error('Error al registrar la tarifa');
    }
    
    return response;

  } catch (error) {
    throw error;
  }
}
