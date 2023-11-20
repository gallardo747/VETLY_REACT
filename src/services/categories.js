const categoriesJSON = {
	"categories": [
		{ "id": 0, "categoriaProducto": "Perfil", "icono": "👩‍⚕️" },
		{ "id": 8, "categoriaProducto": "Usuarios", "icono": "👥" },
		{ "id": 9, "categoriaProducto": "Bitacoras", "icono": "📜" },
		{ "id": 10, "categoriaProducto": "Errores", "icono": "❗" },
		{ "id": 11, "categoriaProducto": "Permisos", "icono": "🔒" },
		{ "id": 12, "categoriaProducto": "Backup", "icono": "🔐" },
		{ "id": 13, "categoriaProducto": "Agenda", "icono": "📅" },
		{ "id": 14, "categoriaProducto": "Veterinarias", "icono": "🏥" },
		{ "id": 15, "categoriaProducto": "Mascotas", "icono": "🐾" },
		{ "id": 16, "categoriaProducto": "Ingresos", "icono": "💰" },
		{ "id": 17, "categoriaProducto": "Profesionales", "icono": "👩‍⚕️" },
		{ "id": 18, "categoriaProducto": "Cobros", "icono": "💳" },
		{ "id": 19, "categoriaProducto": "Pagos", "icono": "💰" },
		{ "id": 20, "categoriaProducto": "Turno_medico", "icono": "⏰" },
		{ "id": 21, "categoriaProducto": "Historia_clinica", "icono": "📋" },
		{ "id": 22, "categoriaProducto": "AutoDiagnostico", "icono": "📋" },
		{ "id": 23, "categoriaProducto": "Calendario", "icono": "📅" },
		{ "id": 24, "categoriaProducto": "Honorarios", "icono": "💲" }
	],
	"userTypes": {
		"invitado": [22],
		"admin": [8, 9, 10, 11],
		"profesional": [0, 23, 14, 16, 24],
		"veterinaria": [0, 17, 18, 19],
		"cliente": [0, 15, 13, 20, 21,22]
	}
};

//DEBO REEMPLAZAR ÉSTE JSON, por KPIAdmin_PermisosFP
//KPIAdmin_PermisosFP
//GetKPIAdmin_ControlPermisos
//useTablerosAdmin_ControlPermisos_Categories
//actualizarKPIAdmin_FPCategories

export async function getCategoriesByUserType(type = null) {
  try {
    // Si type es null o undefined, utiliza "invitado" como valor predeterminado
    const userType = type || "invitado";

    // Obtén las categorías por tipo de usuario
    const categoriesByType = categoriesJSON.userTypes[userType.toLowerCase()];

    if (!categoriesByType) {
      throw new Error('Tipo de usuario no encontrado');
    }

    // Filtra las categorías en función del tipo de usuario
    const filteredCategories = categoriesJSON.categories.filter(cat => categoriesByType.includes(cat.id));

    // Mapea las categorías según el formato requerido
    const mappedCategories = filteredCategories.map(item => ({
      id: item.id,
      name: item.categoriaProducto,
      icon: item.icono,
    }));

    return mappedCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}