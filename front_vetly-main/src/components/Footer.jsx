import React from 'react';
//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------
import { Route, Link, useLocation} from 'wouter';


export function Footer() {

  const [, navigate] = useLocation();
  const handleMostrarTerminos = () => {
    navigate('/terminosycondiciones');
  };
  

  return (
    <div className='container mx-auto px-1 mt-5 bg-base-300 rounded-lg' style={{ width: '25%', height: '10vh', float: 'left', paddingLeft: '1cm' }}>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-2 mt-2'>
        <button  onClick={handleMostrarTerminos} className='bg-green-200 p-1' style={{ fontSize: '9px', width: '5em', marginRight: '9em' }}>
            <FormattedMessage id="footer.acerca" defaultMessage="Acerca de"/>
        </button>
        <button  onClick={handleMostrarTerminos} className='bg-blue-200 p-1' style={{ fontSize: '9px', width: '5em', marginRight: '9em'  }}>
            <FormattedMessage id="footer.ayuda" defaultMessage="Ayuda"/>
        </button>
        <button  onClick={handleMostrarTerminos} className='bg-violet-300 p-1' style={{ fontSize: '9px', width: '5em', marginRight: '9em'  }}>
            <FormattedMessage id="footer.redes" defaultMessage="Redes sociales"/>
        </button>
        <button  onClick={handleMostrarTerminos} className='bg-red-300 p-1' style={{ fontSize: '9px', width: '5em' }}>
            <FormattedMessage id="footer.medios" defaultMessage="Medios de Pago"/>
        </button>
      </div>
      <div className='grid grid-cols-1 gap-12'>
        <div className='p-2' style={{ fontSize: '9px' }}>
          <button onClick={handleMostrarTerminos}><FormattedMessage id="footer.terminos" defaultMessage="Términos y condiciones"/></button>  
          ©2023 Vetly
        </div>
      </div>
    </div>
  );
}
