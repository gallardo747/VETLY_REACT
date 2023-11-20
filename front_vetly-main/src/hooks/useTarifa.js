import { useState, useEffect } from 'react';
import { GetTarifaByProfesionalAndVeterinaria, RegistrarTarifa} from '../services/tarifas';

export function useTarifa(Idprofesional, Idveterinaria) {
  const [tarifas, setTarifas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTarifas = await GetTarifaByProfesionalAndVeterinaria(Idprofesional, Idveterinaria);
        setTarifas(fetchedTarifas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Invoca la función fetchData directamente, sin necesidad de condicional.
  }, []);

  async function agregarTarifa(UsuarioId, tarifa, id_Veterinaria ) {
    try {
      const nuevaTarifa = await RegistrarTarifa(UsuarioId, tarifa, id_Veterinaria);

    } catch (error) {
      console.error('Error al agregar la tarifa:', error);
    }
  }
  return { tarifas, agregarTarifa };
}
