import { useState, useEffect } from 'react';
import { GetDiagnostico, RegistrarDiagnostico, ActualizarDiagnostico } from '../services/diagnostico';

export function useDiagnostico() {
  const [diagnostico, setDiagnostico] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDiagnostico = await GetDiagnostico();
        setDiagnostico(fetchedDiagnostico);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function agregarDiagnostico(UsuarioId, diagnosticoData) {
    try {
      const nuevoDiagnostico = await RegistrarDiagnostico(UsuarioId, diagnosticoData);

    } catch (error) {
      console.error('Error al agregar el diagnostico:', error);
    }
  }

  async function updateDiagnostico(UsuarioId, diagnosticoData) {
    try {
      const nuevoDiagnostico = await ActualizarDiagnostico(UsuarioId, diagnosticoData);

    } catch (error) {
      console.error('Error al actualizar el diagnostico:', error);
    }
  }
  return { diagnostico, agregarDiagnostico, updateDiagnostico };
}
