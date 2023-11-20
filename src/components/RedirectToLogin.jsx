import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function RedirectToLogin() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated) {
      window.location.href = window.location.origin; // Cambia la URL según tus necesidades
    }
  }, [isAuthenticated]);

  
  return null; // No renderizamos nada, ya que esto solo se encarga de la redirección
}

export default RedirectToLogin;
