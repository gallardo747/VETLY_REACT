import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter'; 
import { useVeterinariaProfesional } from '../hooks/useVeterinariaProfesional';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import VeterinariasProfTarifaCard from '../components/Cards/VeterinariasProfTarifaCard';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------
export default function Honorarios() {
  const { isAuthenticated } = useAuth0();
  const { categories } = useCategories();

    // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
    const { GLOBALVetly } = useContext(UserContext);
  

    // CARGAR Las VETERINARIAS DEL PROFESIONAL LOGUEADO-----------------------------------
    const { veterinariasProf } = useVeterinariaProfesional(GLOBALVetly.id);
    const welcomeText = '¡Mis Honorarios!';
  return (

        <section className='flex flex-col gap-5 h-full md:flex-row'>
          <CategoriesSideBar categories={categories} />

          <Route path='/honorarios'>
            <RedirectToLogin /> {/* Usamos el componente de redirección aquí */}
            <div className='w-full'>
              <div className="flex items-center py-10">
                <h3 className='text-xl font-bold md:text-3xl ml-2'>
                  <FormattedMessage id="honorarios.bienvenida" defaultMessage={welcomeText}/>
                  </h3>
                
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {veterinariasProf.map((veterinaria) => (
                  <VeterinariasProfTarifaCard
                    key={veterinaria.id}
                    id_Veterinaria={veterinaria.id_Veterinaria}
                    razonSocial={veterinaria.razonSocial}
                    cuit={veterinaria.cuit}
                    id_Profesional={veterinaria.id_Profesional}
                  />
                ))}
              </div>
            </div>
          </Route>
        </section>
  );
}
