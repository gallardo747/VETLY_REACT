import { useState, useEffect } from 'react';
import { GetEspecialidad } from '../services/especialidad';

export function useEspecialidad() {
  const [especialidad, setEspecialidad] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEspecialildad = await GetEspecialidad();
        setEspecialidad(fetchedEspecialildad);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { especialidad };
}
