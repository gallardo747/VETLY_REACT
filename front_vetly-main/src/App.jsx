import { Switch, Route } from 'wouter';
import { Layout } from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserPage from './pages/UserPage.jsx';
import Mascotas from './pages/Mascotas.jsx';
import Agenda from './pages/Agenda.jsx';
import Veterinarias from './pages/Veterinarias.jsx';
import Ingresos from './pages/Ingresos.jsx';
import Profesionales from './pages/Profesionales.jsx';
import Cobros from './pages/Cobros.jsx';
import Pagos from './pages/Pagos.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Bitacoras from './pages/Bitacoras.jsx';
import Errores from './pages/Errores.jsx';
import Backup from './pages/Backup.jsx';
import Permisos from './pages/Permisos.jsx';
import Perfil from './pages/Perfil.jsx';
import TurnoMedico from './pages/TurnoMedico.jsx';
import HistoriaClinica from './pages/HistoriaClinica.jsx';
import Autodiagnostico from './pages/Autodiagnostico.jsx';
import Calendario from './pages/Calendario.jsx';
import Honorarios from './pages/Honorarios.jsx';
import TerminosYCondiciones from './pages/TerminosYCondiciones.jsx';

function App() {
  return (
      <Layout>
        {/* Mantén el CategoriesSideBar en Layout para que esté presente en todas las páginas */}
        <Switch>
          {/* Utiliza el componente Route para cada página */}
          <Route path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/user' component={UserPage} />
          <Route path='/mascotas' component={Mascotas} />
          <Route path='/agenda' component={Agenda} />
          <Route path='/veterinarias' component={Veterinarias} />
          <Route path='/ingresos' component={Ingresos} />
          <Route path='/profesionales' component={Profesionales} />
          <Route path='/cobros' component={Cobros} />
          <Route path='/pagos' component={Pagos} />
          <Route path='/usuarios' component={Usuarios} />
          <Route path='/bitacoras' component={Bitacoras} />
          <Route path='/errores' component={Errores} />
          <Route path='/backup' component={Backup} />
          <Route path='/permisos' component={Permisos} />
          <Route path='/perfil' component={Perfil} />
          <Route path='/turno_medico' component={TurnoMedico} />
          <Route path='/historia_clinica' component={HistoriaClinica} />
          <Route path='/autoDiagnostico' component={Autodiagnostico} />
          <Route path='/calendario' component={Calendario} />
          <Route path='/honorarios' component={Honorarios} />
          <Route path='/terminosycondiciones' component={TerminosYCondiciones} />

          <Route>404 Not Found</Route>
        </Switch>
      </Layout>
  );
}

export default App;
