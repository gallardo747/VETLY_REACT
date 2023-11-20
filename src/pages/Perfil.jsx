import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter'; 
import { usePerfil } from '../hooks/usePerfil';
import cardcss from '../style/card.css';
import { UserContext } from '../contexts/User';
import RedirectToLogin from '../components/RedirectToLogin';
import PerfilClienteCard from '../components/Cards/PerfilClienteCard';
import PerfilProfesionalCard from '../components/Cards/PerfilProfesionalCard';
import PerfilVeterinariaCard from '../components/Cards/PerfilVeterinariaCard';

export default function Perfil() {
  const { isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  
  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO-------------------------------------------
  const { GLOBALVetly } = useContext(UserContext);
  
  // Define dos variables para determinar el componente y las propiedades
  let ProfileCardComponent = null;

  if (GLOBALVetly.type === 'CLIENTE') {
    ProfileCardComponent = PerfilClienteCard;
  } else if (GLOBALVetly.type === 'PROFESIONAL') {
    ProfileCardComponent = PerfilProfesionalCard;
  } else if (GLOBALVetly.type === 'VETERINARIA') {
    ProfileCardComponent = PerfilVeterinariaCard;
  }


  // CARGAR LOS DATOS DEL PERFIL LOGUEADO-----------------------------------
  const { perfil } = usePerfil(GLOBALVetly.id, GLOBALVetly.type);
  const welcomeText = '¡Mi Perfil!';
  
  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/perfil'>
        <RedirectToLogin /> {/* Usamos el componente de redirección aquí */}
        <div className='w-full'>
          <div className="flex items-center py-10">
            <h3 className='text-xl font-bold md:text-3xl ml-2'>{welcomeText}</h3>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {perfil.map((p) => {
              let profileCardProps = {};

              if (GLOBALVetly.type === 'CLIENTE') {
                profileCardProps = {
                  key: p.id,
                  id: p.id,
                  nombre: p.nombre,
                  apellido: p.apellido,
                  dni: p.dni,
                  calle: p.calle,
                  numero: p.numero,
                  piso: p.piso,
                  cp: p.cp,
                  telefono: p.telefono,
                  idPais: p.id_Pais,
                  idProvincia: p.id_Provincia,
                  idCiudad: p.id_Ciudad,
                  fechaNacimiento: p.fecha_Nacimiento,
                  fechaCreacion: p.auD_FechaCreate
                };
              } else if (GLOBALVetly.type === 'PROFESIONAL') {
                profileCardProps = {
                  key: p.id,
                  id: p.id,
                  nombre: p.nombre,
                  apellido: p.apellido,
                  dni: p.dni,
                  matricula: p.matricula,
                  telefono: p.telefono,
                  fechaCreacion: p.auD_FechaCreate,
                }
              }  else if (GLOBALVetly.type === 'VETERINARIA') {
                  profileCardProps = {
                    key: p.id,
                    id: p.id,
                    razonSocial: p.razonSocial,
                    cuit: p.cuit,
                    calle: p.calle,
                    numero: p.numero,
                    piso: p.piso,
                    cp: p.cp,
                    barrio: p.barrio,
                    telefono: p.telefono_Part,
                    celular: p.celular,
                    aliasMP: p.aliasMP,
                    cbump: p.cbump,
                    idPais:p.id_Pais,
                    idProvincia:p.id_Provincia,
                    idCiudad:p.id_Ciudad,
                    fechaCreacion: p.auD_FechaCreate,
                    latitud:p.coordenadaX,
                    longitud:p.coordenadaY,
                  };
              }

              return <ProfileCardComponent {...profileCardProps} />;
            })}
          </div>
        </div>
      </Route>
    </section>
  );
}
