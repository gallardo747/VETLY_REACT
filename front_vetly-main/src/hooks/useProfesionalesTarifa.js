import { useState, useEffect } from 'react';
import { GetProfesionalesByIDVeterinaria } from '../services/profesionales';

// OBJETIVO: a) Levantar todos los profesionales correspondientes a la VETERINARIA (IDVETERINARIA)

export function useProfesionalesTarifa(id) {
  const [profesionales, setProfesionales] = useState([]);

    // Función para actualizar la devolución de profesionales
    const actualizarProfesionales = async (newId) => {
      try {
        const fetchedProfesionales = await GetProfesionalesByIDVeterinaria(newId);
        setProfesionales(fetchedProfesionales);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProfesionales = await GetProfesionalesByIDVeterinaria(id);
        setProfesionales(fetchedProfesionales);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { profesionales, actualizarProfesionales };
}
