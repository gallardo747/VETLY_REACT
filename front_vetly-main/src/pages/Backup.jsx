import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { useVeterinarias } from '../hooks/useVeterinarias';

export default function Backup() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const { veterinarias } = useVeterinarias();
  const welcomeText = isAuthenticated ? `¡Bienvenido ${user?.name} a la página de Backup! 👋` : '¡Bienvenido a la página de Backup! 👋';

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/backup'>
        <div className='w-full'>
          <h2 className='text-center text-xl font-bold py-10 md:text-3xl'>{welcomeText}</h2>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Calle</th>
                <th>Número</th>
                <th>Piso</th>
                <th>Código Postal</th>
                <th>Barrio</th>
                <th>ID Provincia</th>
                <th>ID País</th>
                <th>ID Usuario</th>
                <th>Teléfono</th>
                <th>Celular</th>
                <th>Activo</th>
                <th>AUD Fecha de Creación</th>
                <th>AUD Fecha de Modificación</th>
                <th>Alias MP</th>
                <th>CBU/MP</th>
              </tr>
            </thead>
            <tbody>
              {veterinarias.map((veterinaria) => (
                <tr key={veterinaria.id}>
                  <td>{veterinaria.id}</td>
                  <td>{veterinaria.razonSocial}</td>
                  <td>{veterinaria.cuit}</td>
                  <td>{veterinaria.calle}</td>
                  <td>{veterinaria.numero}</td>
                  <td>{veterinaria.piso}</td>
                  <td>{veterinaria.cp}</td>
                  <td>{veterinaria.barrio}</td>
                  <td>{veterinaria.id_Provincia}</td>
                  <td>{veterinaria.id_Pais}</td>
                  <td>{veterinaria.id_Usuario}</td>
                  <td>{veterinaria.telefono_Part}</td>
                  <td>{veterinaria.celular}</td>
                  <td>{veterinaria.activo ? 'Sí' : 'No'}</td>
                  <td>{veterinaria.auD_FechaCreate}</td>
                  <td>{veterinaria.auD_FechaModify}</td>
                  <td>{veterinaria.aliasMP}</td>
                  <td>{veterinaria.cbump}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Route>
    </section>
  );
}
