import { useState, useEffect } from 'react';
import { GetRazas } from '../services/razas';

export function useRazas() {
  const [razas, setRazas] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRazas = await GetRazas();
        setRazas(fetchedRazas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { razas };
}
