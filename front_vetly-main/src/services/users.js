const API_URL = import.meta.env.VITE_API_URL

export async function getUserByEmail (email) {
  try {
    const response = await fetch(`${API_URL}/api/Usuario/LoginPerfilByEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Error al obtener el usuario')
    }

    const users = await response.json();
    const userInfos = [];

    for (const user of users) {
       const userInfo = {
        email: user.email,
        type: user.tipo_Usuario,
        id:user.id
      }

      userInfos.push(userInfo);
    }
    return userInfos

  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser (user) {
  const newUser = {
    email: user.email,
    id_tipo_usuario: user.type
  }

  try {
    const response = await fetch(`${API_URL}/api/Usuario/RegistrarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error('Error al registrar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateUserType (email, type) {
  const newUser = {
    email,
    idNewType: type
  }

  try {
    const response = await fetch(`${API_URL}/api/Usuario/ActualizarUsuario`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function GetAllUsers() {
  const endpoint = '/api/Usuario/getUsuario';
  const apiUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener los Usuarios');
    }

    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ActualizarUsuario (user) {
  const updateUser = {
    email: user.email,
    id_tipo_usuario: user.type,
    //id_tipo_Usuario: user.id_tipo_Usuario,
    borrado: user.borrado,
    id:user.id,
    fecha_borrado: user.fecha_borrado,
    fecha_creacion: user.fecha_creacion
  }


  try {

    const response = await fetch(`${API_URL}/api/Usuario/ActualizarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function LogOutUsuarioActivo (user) {
  try {

    const response = await fetch(`${API_URL}/api/Usuario/LogOutUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      throw new Error('Error de LOGOUT del usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}


export async function ActualizarEstUsuario (user) {
  const updateUser = {
    email: user.email,
    //id_tipo_usuario: user.type,
    id_tipo_Usuario: user.id_tipo_Usuario,
    borrado: user.borrado,
    id:user.id,
    fecha_borrado: user.fecha_borrado,
    fecha_creacion: user.fecha_creacion
  }


  try {

    const response = await fetch(`${API_URL}/api/Usuario/ActualizarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
