import { useContext } from 'react'
import { UserContext } from '../contexts/User'
import { useState, useEffect } from 'react';
import { GetAllUsers } from '../services/users';
import { ActualizarUsuario, LogOutUsuarioActivo , ActualizarEstUsuario} from '../services/users'; 

export function useUser () {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}


export function useGetUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsuarios = await GetAllUsers();
        setUsuarios(fetchedUsuarios);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  return { usuarios };
}

export async function ActualizarDatosUsuario(user) {
  try {
    // Llama a la función ActualizarUsuario de users.js

    await ActualizarUsuario(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ActualizarEstadoUsuario(user) {
  try {
    // Llama a la función ActualizarUsuario de users.js

    await ActualizarEstUsuario(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}




export async function LogOutUsuario(user) {
  try {

    await LogOutUsuarioActivo(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}