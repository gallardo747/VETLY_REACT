import { useState, useEffect } from 'react';
import { RegistrarTurno, GetTurnosTomadosByProfesionales } from '../services/turno';

export function useTurno(id) {
  const [turnos, setTurnos] = useState([]);

    // Función para actualizar la devolución de profesionales
    const actualizarTurnos = async (newId) => {
      try {
        const fetchedTurnos = await GetTurnosTomadosByProfesionales(newId);
        setTurnos(fetchedTurnos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTurnos = await GetTurnosTomadosByProfesionales(id);
        setTurnos(fetchedTurnos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function agregarTurno(UsuarioId, mascotaData, turnoData, token) {
    try {
      const nuevoTurno = await RegistrarTurno(UsuarioId, mascotaData, turnoData, token);
      // Puedes hacer algo con nuevoTurno si es necesario
      return nuevoTurno;
    } catch (error) {
      console.error('Error al agregar el Turno:', error);
    }
  }


  return { turnos, actualizarTurnos, agregarTurno };
}
