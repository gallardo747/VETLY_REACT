import { useState, useEffect } from 'react';
import { ActualizarCliente } from '../services/clientes';

export function useCliente() {
  const [clientes, setClientes] = useState([]);

  async function updateCliente(UsuarioId, clienteData, token) {
    try {
      const clienteActualizado = await ActualizarCliente(UsuarioId, clienteData, token);

    } catch (error) {
      console.error('Error al actualizar el Cliente:', error);
    }
  }
  return {  updateCliente };
}
