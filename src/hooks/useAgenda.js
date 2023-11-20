import { useState, useEffect } from 'react';
import { GetAgenda } from '../services/Agendas';

export function useAgenda(id) {
  const [agendas, setAgendas] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAgendas = await GetAgenda(id);
        setAgendas(fetchedAgendas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);
  return { agendas };
}
