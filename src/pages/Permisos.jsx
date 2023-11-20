import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesSideBar } from '../components/CategoriesSideBar';
import { Route, Link, useLocation} from 'wouter';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import { Table } from 'react-bootstrap';
import '../style/grillas.css'; // Importa tu archivo de estilos personalizados
import { UserContext } from '../contexts/User';
import { useTablerosAdmin_ControlPermisos } from '../hooks/useTableros';
import { Pagination } from 'react-bootstrap';
import Modal from 'react-modal';
import { useFamilias } from '../hooks/useFamilias';
import RedirectToLogin from '../components/RedirectToLogin';

//MULTIIDIOMA-------------------------------------------------------------------------------
import { FormattedMessage } from 'react-intl';  
//-------------------------------------------------------------------------------------------


export default function Permisos() {
  const { user, isAuthenticated } = useAuth0();
  const { categories } = useCategories();
  const welcomeText = 'CONTROL DE PATENTES';
  const [usuario, setUsuario] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [solicitudesLoaded, setSolicitudesLoaded] = useState(false);
  const [PatenteAModificar, setPatenteAModificar] = useState(null);
  const [RolAModificar, setRolAModificar] = useState(null);
  const [NuevoEstadoPatenteRol, setNuevoEstadoPatenteRol] = useState(null);
  const [Id_Familia, setId_Familia] = useState(null);
  const [Id_FamiliaPatente, setId_FamiliaPatente] = useState(null);
  
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // CARGAR LAS VARIABLES DE ESTADO DEL USUARIO dentro del componente
  const { GLOBALVetly } = useContext(UserContext);
  useEffect(() => {
    setUsuario(GLOBALVetly.id);
  }, [GLOBALVetly.id]);

  const [, navigate] = useLocation();
  const { UpdateFamiliaPantente } = useFamilias();

  // PASO 2: CARGAR LA GRILLA DE PATENTES POR PERFIL
  const { KPIAdmin_PermisosControl, actualizarKPIAdmin_PermisosControl } = useTablerosAdmin_ControlPermisos();

  useEffect(() => {
    const fetchData = async () => {
      if (!solicitudesLoaded && usuario !== null && KPIAdmin_PermisosControl !== null) {

          // Puedes hacer que actualizarKPIAdmin_PermisosControl retorne una promesa
          await actualizarKPIAdmin_PermisosControl();

          const updatedData = KPIAdmin_PermisosControl.map((item) => ({
            id: item.id,
            permiso: item.patente,
            invitado: item.invitado === 'SI' ? true : item.invitado === 'NO' ? false : 'NO APLICA',
            cliente: item.cliente === 'SI' ? true : item.cliente === 'NO' ? false : 'NO APLICA',
            profesional: item.profesional === 'SI' ? true : item.profesional === 'NO' ? false : 'NO APLICA',
            veterinaria: item.veterinaria === 'SI' ? true : item.veterinaria === 'NO' ? false : 'NO APLICA',
            administrador: item.admin === 'SI' ? true : item.admin === 'NO' ? false : 'NO APLICA',
            idFlia_invitado:item.idFlia_invitado,
            idFlia_admin:item.idFlia_admin,
            idFlia_profesional:item.idFlia_profesional,
            idFlia_veterinaria:item.idFlia_veterinaria,
            idFlia_cliente:item.idFlia_cliente,
            PK_Admin:item.pK_Admin,
            PK_Invitado:item.pK_Invitado,
            PK_Profesional:item.pK_Profesional,
            PK_Veterinaria:item.pK_Veterinaria,
            PK_Cliente:item.pK_Cliente,
          }));
          
          setTableData(updatedData);
          setSolicitudesLoaded(true);
      }
    };

    fetchData();
  }, [usuario, KPIAdmin_PermisosControl, solicitudesLoaded, actualizarKPIAdmin_PermisosControl]);

  const handlePermissionChange = (rowIndex, columnName) => {
    setModalIsOpen(true);
    const updatedData = [...tableData];
    const updatedPermission = updatedData[rowIndex];

    setPatenteAModificar(updatedPermission.id);
    setRolAModificar(columnName);
    setNuevoEstadoPatenteRol(!updatedPermission[columnName] ? 'ON' : 'OFF');
    
    
    if (columnName=='administrador')
    {setId_Familia(updatedPermission.idFlia_admin);
      setId_FamiliaPatente(updatedPermission.PK_Admin);
    }
    else if (columnName=='cliente')
    {setId_Familia(updatedPermission.idFlia_cliente);
      setId_FamiliaPatente(updatedPermission.PK_Cliente);
    }
    else if (columnName=='profesional')
    {setId_Familia(updatedPermission.idFlia_profesional);
      setId_FamiliaPatente(updatedPermission.PK_Profesional);
    }
    else if (columnName=='veterinaria')
    {setId_Familia(updatedPermission.idFlia_veterinaria);
      setId_FamiliaPatente(updatedPermission.PK_Veterinaria);
    }
    else if (columnName=='invitado')
    {setId_Familia(updatedPermission.idFlia_invitado);
      setId_FamiliaPatente(updatedPermission.PK_Invitado);
    }

  };

  const handleCancelar = () => {
    setModalIsOpen(false);
    const updatedData = [...tableData];
 
    setTableData(updatedData); // Actualizar la grilla después de cambiar los datos
  };


  const handleGuardarClick = () => {

    // Verificar si NuevoEstadoPatenteRol es 'ON'
    const activeValue = NuevoEstadoPatenteRol === 'ON' ? 1 : 0;
    const fechaActual = new Date();
    const oUpdateFamiliaPatente = {
        id:Id_FamiliaPatente,  
        id_Familia: Id_Familia,
        id_Patente:PatenteAModificar,
        active:activeValue ,
        auD_FechaModify:fechaActual,
    };

    
    // Llamar a la función REGISTRAR TARIFA
    //RegistrarTarifa(GLOBALVetly.id, oNuevaTarifa, id_Veterinaria);
    UpdateFamiliaPantente(GLOBALVetly.id, oUpdateFamiliaPatente);
    
    // Cerrar el modal y limpiar el nombre
    setModalIsOpen(false);
    // Mostrar el mensaje de éxito durante 1 segundo
    setSuccessMessage('Permiso Actualizado al Rol exitosamente');

    setTimeout(() => {
    setSuccessMessage('');
    // Redirigir al inicio después de mostrar el mensaje
    navigate('/');
    }, 1000);

};


  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className='flex flex-col gap-5 h-full md:flex-row'>
      <CategoriesSideBar categories={categories} />

      <Route path='/permisos'>
          <RedirectToLogin />
        <div className='w-full'>
        {GLOBALVetly.type === 'ADMIN' && (
            <h2 className='text-center text-xl font-bold py-10 md:text-3xl'>
            <FormattedMessage id="controlPermisos.bienvenida" defaultMessage={welcomeText}/>
            </h2>
        )}

        {GLOBALVetly.type === 'ADMIN' && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><FormattedMessage id="controlPermisos.permiso" defaultMessage="Permiso"/></th>
                <th><FormattedMessage id="controlPermisos.invitado" defaultMessage="Invitado"/></th>
                <th><FormattedMessage id="controlPermisos.cliente" defaultMessage="Cliente"/></th>
                <th><FormattedMessage id="controlPermisos.profesional" defaultMessage="Profesional"/></th>
                <th><FormattedMessage id="controlPermisos.veterinaria" defaultMessage="Veterinaria"/></th>
                <th><FormattedMessage id="controlPermisos.administrador" defaultMessage="Administrador"/></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.permiso}</td>
                  {['invitado', 'cliente', 'profesional', 'veterinaria', 'administrador'].map((columnName) => (
                    <td key={columnName}>
                      {row[columnName] !== null ? (
                        <label className="form-check-label" htmlFor={`${columnName}-switch-${rowIndex}`}>
                          <input
                            type="checkbox"
                            id={`${columnName}-switch-${rowIndex}`}
                            checked={row[columnName]}
                            onChange={() => handlePermissionChange(rowIndex, columnName)}
                            disabled={row[columnName] === 'NO APLICA'} // Agregar la propiedad disabled
                          />
                          {row[columnName] ? 'ON' : 'OFF'}
                        </label>
                      ) : (
                        'NO APLICA'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}

          <Pagination>
            {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>


        </div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Actualización de Tarifas del Profesional"
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
                width: '28%',
                position: 'relative',
              },
        }}
      >
        {/* Formulario para editar la tarifa */}
        <h2 className="text-xl font-bold mb-4">
            <FormattedMessage id="controlPermisos.actualizar" defaultMessage="Actualizar Permiso:"/>
          </h2>

        <div className="w-3/3 pr-2">
            <label htmlFor="txtTarifaActual" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id="controlPermisos.seleccionado" defaultMessage="PERMISO SELECCIONADO:"/>
            </label>
            <input
            type="text"
            id="txtTarifaActual"
            name="txtTarifaActual"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder=""
            defaultValue={`Permiso: '${PatenteAModificar}', al Rol: '${RolAModificar}'`}
            readOnly
          />
        </div>

        
        <div className="w-2/3 pr-2">
            <label htmlFor="txtTarifaNueva" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id="controlPermisos.nuevo" defaultMessage="NUEVO VALOR:"/>
            </label>
            <input
            type="text"
            id="txtTarifaNueva"
            name="txtTarifaNueva"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Ingrese la nueva Tarifa"
            defaultValue={NuevoEstadoPatenteRol}
            readOnly
          />
        </div>

        <div className="flex justify-end mt-4">
             <button className="btn btn-secondary mr-2" onClick={handleCancelar}>
                  <FormattedMessage id="controlPermisos.cancelar" defaultMessage="CANCELAR"/>
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGuardarClick}
              >
                <FormattedMessage id="controlPermisos.guardar" defaultMessage="GUARDAR"/>
              </button>
        </div>

      </Modal>
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      </Route>
    </section>
  );
}
