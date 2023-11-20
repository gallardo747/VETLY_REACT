import { useState, useEffect } from 'react';
import { GetMascotasByUser, RegistrarMascota, ActualizarMascota } from '../services/mascotas';

export function useMascotas(email, token) {
  const [mascotas, setMascotas] = useState([]);

  // Función para actualizar la devolución de Mascotas
    const actualizarMascotas = async (Newemail, Newtoken) => {
      try {
        const fetchedMascotas = await GetMascotasByUser(Newemail, Newtoken);
        setMascotas(fetchedMascotas);
      } catch (error) {
      console.error('Error:', error);
      }
      };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMascotas = await GetMascotasByUser(email, token);
        setMascotas(fetchedMascotas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function agregarMascota(UsuarioId, mascotaData, token) {
    try {
      const nuevaMascota = await RegistrarMascota(UsuarioId, mascotaData, token);
      if (!response.ok) {
        
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar la mascota');
      }

    } catch (error) {
      throw error;
    }
  }

  async function updateMascota(UsuarioId, mascotaData, token) {
    try {
      const nuevaMascota = await ActualizarMascota(UsuarioId, mascotaData, token);

    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
    }
  }
  return { mascotas, actualizarMascotas, agregarMascota, updateMascota };
}
