import React, {useState} from 'react';
import MensajesIngles from '../language/en-US.json';
import MensajesEspanol from '../language/es-AR.json';
import { IntlProvider } from 'react-intl';

const langContext = React.createContext();

const LangProvider = ({children}) => {

    const[mensajes, establecerMensajes]=useState(MensajesEspanol);
    const[locale, establecerLocale]=useState('es-AR');
    
    
    const establecerLenguaje = (lenguaje) =>{
        switch(lenguaje){
            case 'es-AR':
                establecerMensajes(MensajesEspanol);
                establecerLocale('es-AR');
                break;
            case 'en-US':
                establecerMensajes(MensajesIngles);
                establecerLocale('en-US');
                break;
            default:
                establecerMensajes(MensajesEspanol);
                establecerLocale('es-AR');

        }
    }

    return(
        <langContext.Provider value={{establecerLenguaje: establecerLenguaje}}>
            <IntlProvider locale={locale} messages={mensajes}>
                {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {LangProvider, langContext};