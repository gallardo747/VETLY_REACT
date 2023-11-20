import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { LogOutUsuario } from '../hooks/useUser';

export const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const redirectUri = window.location.origin; // Almacenar la URL de redirección
  //const redirectUri = 'http://localhost:5173';
  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
  const { GLOBALVetly } = useContext(UserContext);

  const handleClick = () => {
    
    if (isAuthenticated) {
      
      // LOGOUT DEL USUARIO
      const oUser = {
        id: GLOBALVetly.id,
       
      };
      // Registrar en Bitacora
      LogOutUsuario(oUser);
      logout({ logoutParams: { returnTo: window.location.origin } })
      return
    }

    loginWithRedirect({
      authorizationParams: {
        ui_locales: 'es'
      },
      redirectUri: redirectUri
    })
  }

  return (
    <button onClick={handleClick} className='w-52 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
      <span className='w-52 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
        {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </span>
    </button>
  )
}

export const SignUpButton = ({ disabled }) => {
  const { loginWithPopup } = useAuth0()
  //const redirectUri = window.location.origin; // Almacenar la URL de redirección
  const redirectUri = window.location.origin;

  const handleClick = () => {
    loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup',
        ui_locales: 'es'
      },
      redirectUri: redirectUri // Utilizar la URL de redirección almacenada
    });
  }

  return (
    <button type='button' disabled={disabled} onClick={handleClick} className='w-52 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none'>
      <span className='w-52 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
        ¡Unirme a Vetly!
      </span>
    </button>
  )
}
