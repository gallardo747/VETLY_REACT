import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from './contexts/User.jsx'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

//MULTIDIOMA CONTEXT-----------------------------------------------
import { LangProvider } from './contexts/langContext.jsx'
//-----------------------------------------------------------------

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
          <LangProvider>
        <UserProvider>
          <App />
        </UserProvider>
        </LangProvider>
      </Auth0Provider>
    </React.StrictMode>
  

)
