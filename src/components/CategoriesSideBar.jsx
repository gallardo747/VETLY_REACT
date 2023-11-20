import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'wouter'; // Importa Link

export function CategoriesSideBar({ categories }) {
  const { isAuthenticated } = useAuth0();

  return (
    <aside className='w-full h-auto md:w-80 md:h-full'>
      {/* Resto de tu código para la barra lateral de categorías */}
      <ul className={`categories-list flex items-center flex-wrap space-y-2 font-medium md:block`}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/${category.name.toLowerCase()}`}>
              {/* Utiliza Link para redirigir a la ruta correspondiente */}
              <button className='w-full flex items-center p-1 text-gray-900 rounded-lg hover:bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white'>
                {category.icon}
                <span className='ml-2'>{category.name}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
