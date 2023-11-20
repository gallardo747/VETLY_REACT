// profesionales.js

// Recibe el ID(Usuario) y retorna el PERFIL

const API_URL = import.meta.env.VITE_API_URL;

export async function GetPerfilClienteByUser(id) {
  const endpoint = '/api/Cliente/getClienteByUsuario';
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
      throw new Error('Error al obtener los datos del Perfil');
    }

    const cliente = await response.json();

    return cliente;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function GetPerfilProfesionalByUser(id) {
    const endpoint = '/api/Profesional/getProfesionalByUsuario';
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
        throw new Error('Error al obtener los datos del Perfil');
      }
  
      const cliente = await response.json();
  
      return cliente;
    } catch (error) {
      //console.error(error);
      throw error;
    }
}  

export async function GetPerfilVeterinariaByUser(id) {
    const endpoint = '/api/Veterinarias/getVeterinariaByUsuario';
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
        throw new Error('Error al obtener los datos del Perfil');
      }
  
      const cliente = await response.json();
  
      return cliente;
    } catch (error) {
      //console.error(error);
      throw error;
    }
}  