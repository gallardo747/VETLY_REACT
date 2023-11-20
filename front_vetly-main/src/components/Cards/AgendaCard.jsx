import React from 'react';
import vencidaImage from '../Cards/AgendaVencida.png';
import activaImage from '../Cards/AgendaActiva.png';
import { format, sub } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';


const AgendaCard = ({ id, razonSocial, nombreProfesional, ApellidoProfesional, nombreMascota, fechaAtencionInicio, url, motivo, tarifa }) => {
  
  

  const currentDate = new Date(); // Obtiene la fecha y hora actual

  const fechaAtencionInicioDate = new Date(fechaAtencionInicio); // Convierte la fecha de la agenda a un objeto Date
  
  // Extraer el día de inicio y el día actual
  const diaInicio = fechaAtencionInicioDate.getDate();
  const diaActual = currentDate.getDate();
  
  const esFechaPasada = fechaAtencionInicioDate < currentDate;
  const esMismoDia = diaInicio === diaActual;
  
  const isAgendaVencida = esFechaPasada && !esMismoDia;
  
  
  // Determina la imagen según si la agenda está vencida o no
  const imageSource = isAgendaVencida ? vencidaImage : activaImage;

  // Agregar "https://" si la URL no tiene ningún protocolo
  const urlWithProtocol = url ? (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`) : null;

  
  // Formatea la fecha en el formato "YYYY-MM-DD HH:MM"
  const formattedDate = new Date(fechaAtencionInicio)
    .toISOString()
    .slice(0, 16) // Recorta para obtener el formato deseado
    .replace('T', ' '); // Reemplaza 'T' con espacio

  // Determina si el botón "Meet" debe estar habilitado o deshabilitado
  const isMeetButtonDisabled = isAgendaVencida; // Deshabilitado si la agenda está vencida

  // Función para abrir la URL en una nueva ventana al hacer clic en "Meet"
  const openUrlInNewTab = () => {
    window.open(urlWithProtocol, '_blank');
  };

  return (
    <div className="card shadow-lg" style={{ width: '12rem', margin: '10px' }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          <img src={imageSource} alt="Mascota" className="img-fluid" style={{ width: '60%' }} />
          <button className={`btn btn-primary mt-2 ${isMeetButtonDisabled ? 'disabled' : ''}`} onClick={openUrlInNewTab}>Meet</button>
        </div>
        <div className="col-md-8">
          <div className="card-body" style={{ fontSize: '80%' }}>
            <h5 className="card-title" style={{ fontSize: '100%' }}>Turno #{id}</h5>
            <p className="card-text" style={{ marginBottom: '0.5rem' }}>Fecha Atención: <strong>{formattedDate}</strong> Paciente: <strong>{nombreMascota}</strong></p>
            <p className="card-text" style={{ marginBottom: '0.5rem' }}>Veterinaria: <strong>{razonSocial}</strong> - Profesional: <strong>{ApellidoProfesional}, {nombreProfesional}</strong> - Tarifa: <strong>{tarifa}</strong></p>
            <p className="card-text" style={{ marginBottom: '0.5rem' }}>Motivo: {motivo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaCard;
