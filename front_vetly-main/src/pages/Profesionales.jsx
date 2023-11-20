import React, { useContext, useState, useEffect  } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter'; 
import { useProfesionales } from '../hooks/useProfesionales';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import ProfesionalesCard from '../components/Cards/ProfesionalesCard';
import ProfesionalesCardWithDelete from '../components/Cards/ProfesionalesCardWithDelete';
import SolicitudesAAprobarCard  from '../components/Cards/SolicitudesAAprobarCard';
import ReactModal from 'react-modal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // El icono de cruz (X)
import { usePerfil } from '../hooks/usePerfil';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function Profesionales() {
  const { isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  
  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
  const { GLOBALVetly } = useContext(UserContext);
  

  // CARGAR LOS PROFESIONALES DE LA VETERINARIA LOGUEADA-----------------------------------
  const { profesionales } = useProfesionales(GLOBALVetly.id);
  const welcomeText = '¡Mis Profesionales!';

  // CARGAR EL PERFIL DE LA VETERINARIA

      const { perfil } = usePerfil(GLOBALVetly.id, GLOBALVetly.type);
      const [veterinaria, setVeterinaria] = useState(null);
  
      useEffect(() => {
        if (perfil && perfil.length > 0 && perfil[0] && perfil[0].id) {
          setVeterinaria(perfil[0].id);
        }
      }, [perfil]);

      

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSolicitudesAAprobar, setShowSolicitudesAAprobar] = useState(false);

  const handleAñadirClick = () => {
    setIsModalOpen(true);
    setShowSolicitudesAAprobar(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/profesionales'>
        <RedirectToLogin /> {/* Usamos el componente de redirección aquí */}
        <div className='w-full'>
          <div className="flex items-center py-10">
          <h3 className='text-xl font-bold md:text-3xl ml-2'>
              <FormattedMessage id="profesionales.bienvenida" defaultMessage={welcomeText}/>
          </h3>
            {/* Botón "NEW" */}
            <button className="btn btn-primary ml-2"
                onClick={handleAñadirClick}>
                 <FormattedMessage id="profesionales.aceptar" defaultMessage="Aceptar Nuevas Solicitudes +"/> 
            </button>
            
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {profesionales.map((profesional) => (
              <ProfesionalesCardWithDelete
                key={profesional.id_Profesional}
                id={profesional.id_Profesional}
                nombre={profesional.nombre}
                apellido={profesional.apellido}
                matricula={profesional.matricula}
                dni={profesional.dni}
                tarifa={profesional.tarifa}
                id_Vete={veterinaria}
              />
            ))}
          </div>
        </div>
      </Route>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Añadir Veterinaria Modal"
        style={{
          content: {
            width: '35%', // Personaliza el ancho del modal
            height: '90vh', // Personaliza la altura del modal
            margin: 'auto', // Centra el modal horizontalmente
            top: '98%', // Centra el modal verticalmente
            left: '50%', // Centra el modal horizontalmente
            transform: 'translate(-50%, -50%)', // Centra el modal verticalmente
            display: 'flex',
            flexDirection: 'column',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
        }}
      >
      <button
        onClick={handleCloseModal}
        style={{
          alignSelf: 'flex-end',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
        }}
      >
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </button>
        {showSolicitudesAAprobar ? (
          <SolicitudesAAprobarCard id_Vete={veterinaria}/>
        ) : (
          <ProfesionalesCard />
        )}
      </ReactModal>

    </section>
  );
}
