import React, { useContext, useState, useEffect  } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter'; 
import { useVeterinariaProfesional } from '../hooks/useVeterinariaProfesional';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import VeterinariasProfCard from '../components/Cards/VeterinariasProfCard';
import VeterinariasASuscribirCard  from '../components/Cards/VeterinariasASuscribirCard';
import ReactModal from 'react-modal'; 
import { usePerfil } from '../hooks/usePerfil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // El icono de cruz (X)

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function Veterinarias() {
  const { isAuthenticated } = useAuth0();
  const { categories } = useCategories();

    // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
    const { GLOBALVetly } = useContext(UserContext);

    // CARGAR EL PROFESIONAL

    const { perfil } = usePerfil(GLOBALVetly.id, GLOBALVetly.type);
    const [profesional, setProfesional] = useState(null);

    useEffect(() => {
      if (perfil && perfil.length > 0 && perfil[0] && perfil[0].id) {
        setProfesional(perfil[0].id);
      }
    }, [perfil]);


    // CARGAR Las VETERINARIAS DEL PROFESIONAL LOGUEADO-----------------------------------
    const { veterinariasProf } = useVeterinariaProfesional(GLOBALVetly.id);
    
    const welcomeText = '¡Mis Veterinarias!';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showVeterinariasASuscribir, setShowVeterinariasASuscribir] = useState(false);

    const handleAñadirClick = () => {
    setIsModalOpen(true);
    setShowVeterinariasASuscribir(true);
  };

  const handleInfoClick = () => {
    setIsModalOpen(true);
    setShowVeterinariasASuscribir(false);
  };

  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    }

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/veterinarias'>
        <RedirectToLogin /> {/* Usamos el componente de redirección aquí */}
        <div className='w-full'>
          <div className="flex items-center py-10">
          <h3 className='text-xl font-bold md:text-3xl ml-2'>
              <FormattedMessage id="veterinaria.MiVeterinaria" defaultMessage={welcomeText}/>
          </h3>
            {/* Botón "NEW" */}
            <button className="btn btn-primary ml-2" onClick={handleAñadirClick}>
                  <FormattedMessage id="veterinaria.añadir" defaultMessage="Añadir Veterinaria +"/>
            </button>

          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {veterinariasProf.map((veterinaria) => (
              <VeterinariasProfCard
                key={veterinaria.id}
                id_Veterinaria={veterinaria.id_Veterinaria}
                razonSocial={veterinaria.razonSocial}
                cuit={veterinaria.cuit}
                calle={veterinaria.calle}
                numero={veterinaria.numero}
                piso={veterinaria.piso}
                cp={veterinaria.cp}
                barrio={veterinaria.barrio}
                telefono_Part={veterinaria.telefono_Part}
                celular={veterinaria.celular}
                provincia={veterinaria.provincia}
                pais={veterinaria.pais}
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
            height: '100vh', // Personaliza la altura del modal
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
        {showVeterinariasASuscribir ? (
          <VeterinariasASuscribirCard id_Profesional={profesional}/>
        ) : (
          <VeterinariasProfCard />
        )}
      </ReactModal>
    </section>  

  );
}

