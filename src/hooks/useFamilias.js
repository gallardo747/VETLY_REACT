import { useState, useEffect } from 'react';
import { ActualizarFamilia_Patente } from '../services/familias';

export function useFamilias() {
  const [familias, setFamilias] = useState([]);

  async function UpdateFamiliaPantente(UsuarioId, FamiliaPantenteData) {
    try {
      const FamiliaPantenteActualizado = await ActualizarFamilia_Patente(UsuarioId, FamiliaPantenteData);

    } catch (error) {
      console.error('Error al actualizar la Familia Patente:', error);
    }
  }
  return {  UpdateFamiliaPantente };
}
