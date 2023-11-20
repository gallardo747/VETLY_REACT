import { useState, useEffect } from 'react';
import { GetCalendarioDiagnostico } from '../services/CalendarioDiagnostico';

export function useCalendarioDiagnostico(id, fechaAtencionInt) {
  const [calendario, setCalendario] = useState([]);
  
    // Función para actualizar la devolución de calendarios
      const actualizarCalendario = async (newId, newFechaAtencionInt) => {
        try {
          const fetchedCalendario = await GetCalendarioDiagnostico(newId, newFechaAtencionInt);
          setCalendario(fetchedCalendario);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCalendario = await GetCalendarioDiagnostico(id, fechaAtencionInt);
        setCalendario(fetchedCalendario);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { calendario, actualizarCalendario };
}
