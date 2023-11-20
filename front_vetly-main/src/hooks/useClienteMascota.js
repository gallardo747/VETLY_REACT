import { useState, useEffect } from 'react';
import { GetClienteMascotaByCM } from '../services/ClienteMascota';

// OBJETIVO: a) Levantar todas las veterinarias correspondientes al PROFESIONAL

export function useClienteMascota(idCliente, idMascota) {
  const [clienteMascota, setclienteMascota] = useState([]);

      // Función para actualizar la devolución de profesionales
      const actualizarClienteMascota = async (newCliente, newMascota) => {
        try {
          const fetchedClienteMascota = await  GetClienteMascotaByCM(newCliente, newMascota);
          setclienteMascota(fetchedClienteMascota);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedClienteMascota = await GetClienteMascotaByCM(idCliente, idMascota);
        setclienteMascota(fetchedClienteMascota);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { clienteMascota };
}




