import { useState, useEffect } from 'react'
import { getCategoriesByUserType } from '../services/categories'
import { useUser } from './useUser'

export function useCategories () {
  const { user } = useUser()
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    const getCategories = async () => {
      try {
                //INFO: RECORDAR que "users" está devolviendo un ARRAY de user, con sus 2 propiedades (email y type)
        //      por lo cual, debo mostrar la posición cero del array
        //      (user[0].email); // Muestra el valor de la propiedad 'email' del primer elemento
        //      (user[0].type); // Muestra el valor de la propiedad 'type' del primer elemento
        
        if (user && user[0] && user[0].type) {
          // Cargo el TIPO DE USUARIO LOGUEADO
          const fetchedCategories = await getCategoriesByUserType(user[0].type)
          setCategories(fetchedCategories)
        } else {
          // Cargo el TIPO DE USUARIO "INVITADO"
          const fetchedCategories = await getCategoriesByUserType('invitado')
          setCategories(fetchedCategories)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (user) {
      getCategories()
    }
  }, [user])

  return { categories }
}
