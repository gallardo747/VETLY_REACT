import { useState, useEffect } from 'react';
import { GetPerfilClienteByUser } from '../services/perfil';
import { GetPerfilProfesionalByUser } from '../services/perfil';
import { GetPerfilVeterinariaByUser } from '../services/perfil';

// OBJETIVO: a) Levantar los datos correspondientes al PERFIL
//           Tener en cuenta que tengo 3 perfiles y una API en función de cada Perfil


export function usePerfil(id, type) {
  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'CLIENTE')
         {
            const fetchedPerfil = await GetPerfilClienteByUser(id);
            setPerfil(fetchedPerfil);
         }
         if (type === 'PROFESIONAL')
         {
            const fetchedPerfil = await GetPerfilProfesionalByUser(id);
            setPerfil(fetchedPerfil);
         }
         if (type === 'VETERINARIA')
         {
            const fetchedPerfil = await GetPerfilVeterinariaByUser(id);
            setPerfil(fetchedPerfil);
         }

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { perfil };
}
