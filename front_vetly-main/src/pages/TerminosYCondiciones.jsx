import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link } from 'wouter';
import '../style/termsAndConditions.css';

export default function TerminosYCondiciones() {
  const { categories } = useCategories();
  const welcomeText = `TÉRMINOS Y CONDICIONES`;

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/TerminosYCondiciones'>
        <div className='w-fullTerms'>
          <h1 className='text-xl font-bold md:text-3xl ml-2'>{welcomeText}</h1>
          <p>Versión vigente: 11 de Noviembre, 2023</p>

          <h2>Resumen de términos y condiciones</h2>
          <ul>
            <li><span className="highlighted-text">VETLY</span> es una compañía de tecnología que ofrece servicios vinculados principalmente al comercio electrónico y a los pagos digitales.</li>
            <li>Podrán operar dentro de <span className="highlighted-text">VETLY</span> quienes tengan capacidad legal.</li>
          </ul>

          <p>Cada Persona Usuaria es responsable de los datos personales que brinda al momento de registrarse y se obliga a mantenerlos actualizados. Además, es el único responsable del uso y resguardo de su contraseña.</p>

          <p>En algunos casos, podremos cobrar una tarifa por el uso de los servicios que integran el ecosistema de <span className="highlighted-text">VETLY</span>, que la Persona Usuaria se compromete a pagar.</p>

          <h2>1- Términos y Condiciones</h2>
          <p>Las Personas Usuarias aceptan estos Términos y Condiciones desde el momento en que se registran en el Sitio de <span className="highlighted-text">VETLY</span>.</p>
          <p>Cuando debamos hacer cambios importantes en nuestros servicios, publicaremos las modificaciones con 10 días corridos de anticipación para que las Personas Usuarias puedan revisarlas y seguir usando el Ecosistema <span className="highlighted-text">VETLY</span>. Las Personas Usuarias que no tengan obligaciones pendientes con <span className="highlighted-text">VETLY</span>, podrán finalizar la relación con <span className="highlighted-text">VETLY</span> cancelando su cuenta.</p>

          <h2>2- Capacidad</h2>
          <p>Podrán usar nuestros servicios las personas mayores de edad que tengan capacidad legal para contratar.</p>

          <h2>3- Registro y Cuenta</h2>
          <p>Quien quiera usar nuestros servicios, deberá completar el formulario de registro con los datos que le sean requeridos. Al completarlo, se compromete a hacerlo de manera exacta, precisa y verdadera y a mantener sus datos siempre actualizados. La Persona Usuaria será la única responsable de la certeza de sus datos de registro. Sin perjuicio de la información brindada en el formulario, podremos solicitar y/o consultar información adicional para corroborar la identidad de la Persona Usuaria. </p>

          <p>La cuenta es personal, única e intransferible, es decir que bajo ningún concepto se podrá vender o ceder a otra persona. Se accede a ella con la clave personal de seguridad que haya elegido y que deberá mantener bajo estricta confidencialidad.</p>
          <p>Podremos rechazar una solicitud de registro o bien cancelar un registro ya aceptado, sin que esto genere derecho a un resarcimiento.</p>


          <h2>4- Responsabilidad</h2>
          <p><span className="highlighted-text">VETLY</span> será responsable por cualquier defecto en la prestación de su servicio, en la medida en que le sea imputable y con el alcance previsto en las leyes vigentes. 
          <span className="highlighted-text">VETLY</span> no será responsable de los diagnósticos, recetas, consejos, procedimientos realizados por los profesionales. Cada profesional, expone y responde con su matrícula. 
          </p>

          <h2>5- Indemnidad</h2>
          <p>La Persona Usuaria mantendrá indemne a <span className="highlighted-text">VETLY</span> y sus sociedades relacionadas, así como a quienes la dirigen, suceden, administran, representan y/o trabajan en ellas, por cualquier reclamo administrativo o judicial iniciado por otras Personas Usuarias y terceros.</p>

          <h2>6- Medios de Pago</h2>
          <p>Se utilizará MERCADO PAGO para realizar las transacciones de <span className="highlighted-text">VETLY</span>.</p>

        </div>
      </Route>
    </section>
  );
}
