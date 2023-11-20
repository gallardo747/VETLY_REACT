import { useState, useEffect } from 'react';
import { GetPaises } from '../services/paises';

export function usePaises() {
  const [paises, setPaises] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPaises = await GetPaises();
        setPaises(fetchedPaises);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { paises };
}
