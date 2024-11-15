import { useState, useEffect, useCallback } from 'react';

import Logo from '../../components/Logo/Logo.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import Notification from '../../components/Notification/Notification.js';
import Bono from '../../components/Items/Bono/Bono.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import WrapperFiltros from '../../components/Forms/WrapperFiltros/WrapperFiltros.js';
import Button from '../../components/Button/Button.js';

import './BonoList.css'

import { getBono, getSearch } from '../../services/apiServicesBonos.js';


function BonoList() {

  const [bonos, setBonos] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState('');
  const [code, setCode] = useState('');

  const refreshBonos = useCallback(async () => {
    try {
      const bonosList = await getBono();
      setBonos(bonosList || []);  // Aseguramos que siempre sea un arreglo
    } catch (error:any) {
      console.error('Error fetching bonos:', error);
      setError(error.message || 'Error al obtener la lista de bonos');
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    refreshBonos();
  }, []);

  //filtros de busqueda de bonos
  const handleSearch = useCallback(async (e:any) => {
    e.preventDefault();

    if (!user && !code ) {
      setError("Por favor, ingrese uno de los campos antes de buscar");
      return; // No se envía la solicitud al no tener ningún campo
    }

    // Verificar que no se hayan ingresado ambos campos
    if (user && code) {
      setError("Por favor, ingrese sólo uno de los dos campos: 'username' o 'codigo'.");
      return;
    }

    // Limpiar advertencia en caso de que se haya corregido el error
    setError(null);

    try {
      const result = await getSearch(user, code);
      setBonos(result); // Actualiza el lisado con los bonos encontrados
      setError(''); // Limpia errores anteriores
      } catch (error:any) {
        console.error('Error en la búsqueda:', error);
        setError(error.message || 'No se pudieron encontrar bonos.');
        setBonos([]); // Limpia los resultados si hay un error
    }
  }, [user, code]);

  //cerrar la ventana de notificación
  const handleCloseNotification = useCallback(() => { 
    setError(null);
  }, []);

  // limpiar filtros
  const clearFilters = useCallback(() => {
    setUser('');
    setCode('');
    setError(null);
    refreshBonos();
  }, [refreshBonos]);

  return (
    <div className="p-bono-list">
        <NavBar />

        <WrapperNav>
          <Logo color="blue" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>
        
        <Wrapper>
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}
          
          <div className="bonos">
            <h2 className='box-title'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                <path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/>
                <path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
                <path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/>
                <path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
              </svg>
              <span>BonoList</span> List
            </h2>
            <WrapperFiltros>
              <form onSubmit={handleSearch} className='form-filtros-bonos-list'>
                  <h3>Puedes realizar la búsqueda de bonos utilizando los siguientes filtros:</h3>
                  <div className='box-form-filtros'>
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="username con bono asignado"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <label>Código Bono:</label>
                    <input
                        type="text"
                        placeholder="código del bono"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <div className='b-buttons'>
                      <Button color="dark" onClick={handleSearch} text="buscar" type="submit" />
                      <Button color="light" onClick={clearFilters} text="Limpiar Filtros" type="button"/>
                    </div>
                  </div>
                </form>
            </WrapperFiltros>
            <div className='list-bonos'>
              {bonos.length === 0 ? (
                  <p>No hay bonos disponibles.</p>
                ) : (
                  bonos.map((bono:any, index) => (
                    <Bono
                        key={index}
                        name={bono.name}
                        type={bono.type}
                        active={bono.active}
                        code={bono.code}
                        totalUses={bono.totalUses}
                        availableUses={bono.availableUses}
                        expirationDate={bono.expirationDate}
                        refreshBonos={refreshBonos}
                        user={bono.user}
                        id={bono._id}
                    />
                ))
              )}
            </div>
          </div>
        </Wrapper>
    </div>
  )
}

export default BonoList;
