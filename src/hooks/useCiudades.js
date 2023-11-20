import { useState, useEffect } from 'react';
import { GetCiudades } from '../services/ciudades';

export function useCiudades() {
  const [ciudades, setCiudades] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCiudades = await GetCiudades();
        setCiudades(fetchedCiudades);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { ciudades };
}
