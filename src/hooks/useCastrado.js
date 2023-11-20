import { useState, useEffect } from 'react';
import { GetCastrado } from '../services/castrado';

export function useCastrado() {
  const [castrado, setCastrado] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCastrado = await GetCastrado();
        setCastrado(fetchedCastrado);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { castrado };
}
