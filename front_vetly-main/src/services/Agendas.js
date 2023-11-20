// bitacoras.js

import Agenda from "../pages/Agenda";

// Recibe el ID(Usuario) para devolver las agendas

const API_URL = import.meta.env.VITE_API_URL;

export async function GetAgenda(id) {
  const endpoint = '/api/ConsultaProfesional/getAgendaByUsuario';
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
      throw new Error('Error al obtener las Agendas');
    }

    const agenda = await response.json();
    return agenda;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
