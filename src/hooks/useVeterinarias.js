import { useState, useEffect } from 'react';
import { GetVeterinarias } from '../services/veterinarias';
import { UpdateVeterinaria } from '../services/veterinarias';

export function useVeterinarias() {
  const [veterinarias, setVeterinarias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeterinarias = await GetVeterinarias();
        setVeterinarias(fetchedVeterinarias);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function updateVeterinaria(UsuarioId, veterinariaData, token) {
    try {
      const veterinariaActualizado = await UpdateVeterinaria(UsuarioId, veterinariaData, token);

    } catch (error) {
      console.error('Error al actualizar la Veterinaria:', error);
    }
  }

  return { veterinarias, updateVeterinaria };
}
