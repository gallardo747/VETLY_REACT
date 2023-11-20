//Bitacoras
// Este codigo es distinto al de Profesionales por ejemplo (donde solo levanto 1 vez el HOOK al inicio)
//Desde Bitacoras necesito invocar el hook de Bitacoras por Usuario cada vez que se selecciona el combo de 
//Usuarios. Y Si se resuelve desde Bitacoras.jsx da error de Invocación de HOOK de funcion a función. Por lo
// que la parte del estado, la resolvi en este hook

import { useState, useEffect } from 'react';
import { GetBitacoras } from '../services/bitacoras';

export function useBitacoras(id) {
  const [bitacoras, setBitacoras] = useState([]);

  // Función para actualizar las bitácoras
  const actualizarBitacoras = async (newId) => {
    try {
      const fetchedBitacoras = await GetBitacoras(newId);
      setBitacoras(fetchedBitacoras);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Llama a la función para cargar las bitácoras iniciales
    actualizarBitacoras(id);
  }, [id]); // Ejecuta esto cuando cambie el ID

  return { bitacoras, actualizarBitacoras };
}

