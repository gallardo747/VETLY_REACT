import { useState, useEffect } from 'react';
import { GetEspecies } from '../services/especies';

export function useEspecies() {
  const [especies, setEspecies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEspecies = await GetEspecies();
        setEspecies(fetchedEspecies);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { especies };
}
