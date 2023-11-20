import { useState, useEffect } from 'react';
import { GetVeterinaraProfesionalByVP } from '../services/veterinariasProfesionales';



// OBJETIVO: a) Levantar todas las veterinarias-Profesional correspondientes al Objeto Veterinaria y encabezado Profesional

export function useVP(veterinaria, idProfesional) {
  const [veterinariaProfesional, setveterinariasProf] = useState([]);

      // Función para actualizar la devolución de profesionales
      const actualizarVP = async (Newveterinaria, NewidProfesional) => {
        try {
          const fetchedVeterinariasProf = await GetVeterinaraProfesionalByVP(Newveterinaria, NewidProfesional);
          setveterinariasProf(fetchedVeterinariasProf);
        } catch (error) {
          console.error('Error:', error);
        }
      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeterinariasProf = await GetVeterinaraProfesionalByVP(veterinaria, idProfesional);
        setveterinariasProf(fetchedVeterinariasProf);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  
  return { veterinariaProfesional, actualizarVP };
}
