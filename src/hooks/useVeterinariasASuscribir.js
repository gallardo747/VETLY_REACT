// A diferencia de useVeterinarias (que trae todas las veterinarias) sólo taera 
// las veterinarias que no estén ya en Veterinaria_Profesional

import { useState, useEffect } from 'react';
import { GetVeterinarias } from '../services/VeterinariasASuscribir';


export function useVeterinarias(id) {
  const [veterinarias, setVeterinarias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeterinarias = await GetVeterinarias(id);
        setVeterinarias(fetchedVeterinarias);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);



  return { veterinarias };
}
