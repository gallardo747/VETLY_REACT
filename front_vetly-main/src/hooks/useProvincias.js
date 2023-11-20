import { useState, useEffect } from 'react';
import { GetProvincias } from '../services/provincias';

export function useProvincias() {
  const [provincias, setProvincias] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProvincias = await GetProvincias();
        setProvincias(fetchedProvincias);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { provincias };
}
