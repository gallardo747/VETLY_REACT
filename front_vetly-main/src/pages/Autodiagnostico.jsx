import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import { useMLDiagnostico } from '../hooks/useMLDiagnostico';
import CriticoImage from '../pages/critico.png';
import NOCriticoImage from '../pages/NotCritico.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap
import logo from '../components/logo.jpg'

export default function Autodiagnostico() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const { arbol } = useMLDiagnostico();
  const welcomeText = '¡DETERMINEMOS JUNTOS SI ES UNA URGENCIA!';
  const ObjetivoText = 'En el caso de que el resultado sea "CRÍTICO" te sugerimos acercarte a la sala de Urgencia más cercana';

  const [descripcionActual, setDescripcionActual] = useState('');
  const [siguientePreguntaSi, setSiguientePreguntaSi] = useState(null);
  const [siguientePreguntaNo, setSiguientePreguntaNo] = useState(null);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(false);

  useEffect(() => {
    // Obtener la descripción inicial y las siguientes preguntas para "SI" y "NO"
    if (arbol.length > 0) {
      const nodoInicial = arbol.find((nodo) => nodo.id === 0);
      if (nodoInicial) {
        setDescripcionActual(nodoInicial.descripcion);
        setSiguientePreguntaSi(nodoInicial.respuesta_si);
        setSiguientePreguntaNo(nodoInicial.respuesta_no);
      }
    }
  }, [arbol]);

  const avanzarEnArbol = (siguientePregunta) => {
    if (!botonesDeshabilitados) {
      // Verificar si se debe mostrar alguna de las imágenes
      if (siguientePregunta === 'CRÍTICO - REQUIERE ASISTENCIA URGENTE' || siguientePregunta === 'NO ES CRÍTICO - PODEMOS ACOMPAÑARTE') {
        setBotonesDeshabilitados(true);
      }

      if (!isNaN(siguientePregunta)) {
        const idBuscado = parseInt(siguientePregunta);
        const nodoEncontrado = arbol.find((nodo) => nodo.id === idBuscado);
        if (nodoEncontrado) {
          setDescripcionActual(nodoEncontrado.descripcion);
          setSiguientePreguntaSi(nodoEncontrado.respuesta_si);
          setSiguientePreguntaNo(nodoEncontrado.respuesta_no);
        }
      } else {
        setDescripcionActual(siguientePregunta);
        setSiguientePreguntaSi(null);
        setSiguientePreguntaNo(null);
      }
    }
  };

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/autodiagnostico'>
        <div className='w-full'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="Logo" style={{ width: '15%', marginBottom: '20px' }} />
            </div>
            <h2 className='text-center font-weight-bold fs-4'>
                {welcomeText}
            </h2>

          <h5 style={{ fontSize: '14px' }}>{ObjetivoText}</h5>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>{descripcionActual}</p>
          <div className='d-flex flex-column align-items-center'>
            <button
              className='btn btn-primary'
              onClick={() => avanzarEnArbol(siguientePreguntaSi)}
              disabled={botonesDeshabilitados}
            >
              SI
            </button>
            <button
              className='btn btn-danger'
              onClick={() => avanzarEnArbol(siguientePreguntaNo)}
              disabled={botonesDeshabilitados}
            >
              NO
            </button>
          </div>
          {descripcionActual === 'CRÍTICO - REQUIERE ASISTENCIA URGENTE' && (
            <img src={CriticoImage} alt="CRÍTICO" style={{ width: '30%', margin: '20px auto' }} />
          )}
          {descripcionActual === 'NO ES CRÍTICO - PODEMOS ACOMPAÑARTE' && (
            <img src={NOCriticoImage} alt="NO CRÍTICO" style={{ width: '30%', margin: '20px auto' }} />
          )}
        </div>
      </Route>
    </section>
  );
}
