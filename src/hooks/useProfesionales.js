import { useState, useEffect } from 'react';
import { GetProfesionalesByUser } from '../services/profesionales';
import { UpdateProfesional } from '../services/profesionales';

// OBJETIVO: a) Levantar todos los profesionales correspondientes a la VETERINARIA
//           Desde las VETERINARIAS, sólo veremos los profesionales ACTIVOS
//           b) Como segundo método, levantar TODOS los PROFESIONALES, para invitarlos a participar
export function useProfesionales(id) {
  const [profesionales, setProfesionales] = useState([]);

    // Función para actualizar la devolución de profesionales
    const actualizarProfesionales = async (newId) => {
      try {
        const fetchedProfesionales = await GetProfesionalesByUser(newId);
        setProfesionales(fetchedProfesionales);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProfesionales = await GetProfesionalesByUser(id);
        setProfesionales(fetchedProfesionales);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function updateProfesional(UsuarioId, profesionalData, token) {
    try {
      const profesionalActualizado = await UpdateProfesional(UsuarioId, profesionalData, token);

    } catch (error) {
      console.error('Error al actualizar el Profesional:', error);
    }
  }

  return { profesionales, actualizarProfesionales, updateProfesional };
}
