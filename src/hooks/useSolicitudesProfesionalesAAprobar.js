import { useState, useEffect } from 'react';
import { GetSolicitudesProfesionalesAAprobarByUser } from '../services/solicitudesProfesionalesAAprobar';
import { AprobarSolicitudVeterinariaProfesional } from '../services/solicitudesProfesionalesAAprobar';


// OBJETIVO: a) Levantar todas las Solicitudes correspondientes a la Veterinaria

export function useSolicitudesProfesionalesAAprobar(id) {
  const [solicitudesProf, setsolicitudesProf] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedsolicitudesProf = await GetSolicitudesProfesionalesAAprobarByUser(id);
        setsolicitudesProf(fetchedsolicitudesProf);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function AprobarSolicitud(UsuarioId, veterinariaProfesionalData) {
    try {
      const veterinariaProfesionalActualizado = await AprobarSolicitudVeterinariaProfesional(UsuarioId, veterinariaProfesionalData);

    } catch (error) {
      console.error('Error al Actualizar la relación Veterinaria - Profesional:', error);
    }
  }

  return { solicitudesProf, AprobarSolicitud };
}
