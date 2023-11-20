import { useState, useEffect, useCallback, createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PetsIcon, VetIcon, HospitalIcon, AdminIcon } from '../components/Icons.jsx';
import { getUserByEmail, registerUser, updateUserType } from '../services/users';


export const UserContext = createContext();

export function UserProvider({ children }) {
  const { user: authUser, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState({});
  // GUARDAR EL ESTADO GLOBAL-----------------------------------------------------
  const [GLOBALVetly, setGLOBALVetly] = useState({ id: null, email: '', type: '', idCli:'' });
  //-----------------------------------------------------------------------------
  const userTypes = [
    { id: 0, type: 'ADMIN', label: 'Administrador', icon: <AdminIcon /> },
    { id: 1, type: 'CLIENTE', label: 'Cliente', icon: <PetsIcon /> },
    { id: 2, type: 'PROFESIONAL', label: 'Profesional', icon: <VetIcon /> },
    { id: 3, type: 'VETERINARIA', label: 'Veterinaria', icon: <HospitalIcon /> },
  ];

  // Funcion getUser para levantar los datos del USUARIO en funciín del email------
  const getUser = useCallback(async () => {
    try {
      if (isAuthenticated) {
        // Obtener el token JWT de forma asincrónica
        const token = await getAccessTokenSilently();

        const fetchedUser = await getUserByEmail(authUser.email); // Llamado a una API para que devuelve el usuario con los permisos
        setUser(fetchedUser);

        setGLOBALVetly({
          id: fetchedUser[0].id,
          email: fetchedUser[0].email,
          type: fetchedUser[0].type,
          token: token, // Almacenar el token JWT
        });

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [authUser?.email, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated, getUser]);

  // Con ésto me aseguro que el Estado se actualizará-------------------
  useEffect(() => {
    // Aquí puedes acceder a GLOBALVetly.token si necesitas el token JWT en otro lugar
  }, [GLOBALVetly.id, GLOBALVetly.email, GLOBALVetly.type, GLOBALVetly.token, GLOBALVetly.idCli]);
  //-----------------------------------------------------------------------------------
  const signupUser = (user) => {
    registerUser(user); // Llamado a una API para que registre en BD
    setUser({
      email: user.email,
      type: userTypes[user.type].type,
    });

    // Una vez Registrado levanto los datos del Usuario desde la API
    //getUser();


  };

  const updateType = async (email, type) => {
    updateUserType(email, type); // Llamado a una API para actualizar el registro en BD
    setUser({
      email,
      type: userTypes[type].type,
    });
  };

  const loginAsAdmin = (user, password) => {
    // Aqui se deberia hacer una validacion a una API para poder ingresar como admin
    if (password === 'admin12345') {
      updateType(user.email, 0);
    }
  };

  return (
    <UserContext.Provider value={{ user, userTypes, signupUser, updateType, loginAsAdmin, GLOBALVetly }}>
      {children}
    </UserContext.Provider>
  );
}
