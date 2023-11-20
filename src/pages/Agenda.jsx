import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter'; // Importa Link desde wouter
import { useAgenda } from '../hooks/useAgenda';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import AgendaCard from '../components/Cards/AgendaCard';

export default function Agenda() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
  const { GLOBALVetly } = useContext(UserContext);

  const { agendas } = useAgenda(GLOBALVetly.id);
  const welcomeText = 'Agenda';

    // Ordenar las agendas por fecha_atencion_inicio (de la más reciente a la más antigua)
    agendas.sort((a, b) => {
      return new Date(b.fecha_atencion_inicio) - new Date(a.fecha_atencion_inicio);
    });
    
  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/agenda'>
        <RedirectToLogin /> {/* Usamos el componente de redirección aquí */}
        <div className='w-full'>
          <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>{welcomeText}</h3>
            {/* Botón "NEW" con Link */}
            <Link to="/turno_medico">
              <button className="btn btn-primary ml-2">NEW</button>
            </Link>
            <h2 className='text-xl font-bold md:text-3xl ml-2'>Nuevo Turno</h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {agendas.map((agenda) => (
              <AgendaCard
                key={agenda.id}
                id={agenda.id}
                razonSocial={agenda.razonSocial}
                nombreProfesional={agenda.nombreProfesional}
                ApellidoProfesional={agenda.apellidoProfesional}
                nombreMascota={agenda.nombremascota}
                fechaAtencionInicio={agenda.fecha_atencion_inicio}
                url={agenda.url_invitacion}
                motivo={agenda.motivo_consulta_abrev}
                tarifa={agenda.tarifa}
              />
            ))}
          </div>
        </div>
      </Route>
    </section>
  );
}
