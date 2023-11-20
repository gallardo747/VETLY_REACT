import { useState, useEffect } from 'react';
import { GetSexos } from '../services/sexos';

export function useSexos() {
  const [sexos, setSexos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSexos = await GetSexos();
        setSexos(fetchedSexos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { sexos };
}
