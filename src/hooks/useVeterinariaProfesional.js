import { useState, useEffect } from 'react';
import { GetVeterinariasDelProfesionalByUser } from '../services/veterinariasProfesionales';
import { RegistrarVeterinariaProfesional } from '../services/veterinariasProfesionales';



// OBJETIVO: a) Levantar todas las veterinarias correspondientes al PROFESIONAL

export function useVeterinariaProfesional(id) {
  const [veterinariasProf, setveterinariasProf] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeterinariasProf = await GetVeterinariasDelProfesionalByUser(id);
        setveterinariasProf(fetchedVeterinariasProf);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function RegistrarVeterinaria(UsuarioId, veterinariaProfesionalData) {
    try {
      const veterinariaProfesionalActualizado = await RegistrarVeterinariaProfesional(UsuarioId, veterinariaProfesionalData);

    } catch (error) {
      console.error('Error al Insertar la relación Veterinaria - Profesional:', error);
    }
  }

  return { veterinariasProf, RegistrarVeterinaria };
}
