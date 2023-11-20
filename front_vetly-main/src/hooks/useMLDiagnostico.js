import { useState, useEffect } from 'react';
import { GetArbolML } from '../services/MLDiagnostico';

export function useMLDiagnostico() {
  const [arbol, setArbol] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArbol = await GetArbolML();
        setArbol(fetchedArbol);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);
  
  return { arbol };
}
