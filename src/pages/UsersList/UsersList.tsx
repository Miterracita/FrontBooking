import { useState, useEffect, useCallback } from 'react';

import Logo from '../../components/Logo/Logo.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import Notification from '../../components/Notification/Notification.js';
import User from '../../components/Items/User/User.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import WrapperFiltros from '../../components/Forms/WrapperFiltros/WrapperFiltros.js';
import Button from '../../components/Button/Button.js';

import './UsersList.css'

import { getUsers, getSearch } from '../../services/apiServicesUsers';


function UsersList() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const refreshUsers = useCallback(async () => {
    try {
      const userList = await getUsers();
      setUsers(userList || []);  // Aseguramos que siempre sea un arreglo
      console.log(userList)
      
    } catch (error:any) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Error al obtener la lista de usuarios');
    }
  }, []);

  useEffect(() => {
    refreshUsers(); //cargamos la lista de usuarios desde el back
  }, []);

  //filtros de busqueda
  const handleSearch = useCallback(async (e:any) => {
    e.preventDefault();

    if (!username && !email ) {
      setError("Por favor, ingrese uno de los campos antes de buscar");
      return; // No se envía la solicitud al no tener ningún campo
    }

    // Verificar que no se hayan ingresado ambos campos
    if (username && email) {
      setError("Por favor, ingrese sólo uno de los dos campos: 'username' o 'email'.");
      return;
    }

    // Limpiar advertencia en caso de que se haya corregido el error
    setError(null);

    try {
      const result = await getSearch(username, email);
      setUsers(result); // Actualiza el estado con los usuarios encontrados
      setError(''); // Limpia errores anteriores
      } catch (error:any) {
        console.error('Error en la búsqueda:', error);
        setError(error.message || 'No se pudieron encontrar usuarios.');
        setUsers([]); // Limpia los resultados si hay un error
    }
  }, [username, email]);

  //cerrar la ventana de notificación
  const handleCloseNotification = useCallback(() => { 
    setError(null);
  }, []);

  // limpiar filtros
  const clearFilters = useCallback(() => {
    setUsername('');
    setEmail('');
    setError(null);
    refreshUsers();
  }, [refreshUsers]);

  return (
    <div className="p-users-list">
        <NavBar />

        <WrapperNav>
          <Logo color="blue" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>  

        <Wrapper>
        {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}

          <div className='users'>
            <h2 className='box-title'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25">
                <path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z"/>
              </svg>
              <span>Users</span> List
            </h2>  
            <WrapperFiltros>
              <form onSubmit={handleSearch} className='form-filtros-user-list'>
                <h3>Puedes realizar la búsqueda de usuarios realizando los siguientes filtros:</h3>
                <div className='box-form-filtros'>
                  <label>Username:</label>
                  <input
                      type="text"
                      placeholder="Buscar por username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Email:</label>
                  <input
                      type="email"
                      placeholder="Buscar por email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className='b-buttons'>
                    <Button color="dark" onClick={handleSearch} text="buscar" type="submit" />
                    <Button color="light" onClick={clearFilters} text="Limpiar Filtros" type="button"/>
                  </div>
                </div>
              </form>
            </WrapperFiltros>        
            <div className="list-users">
              {users && users.length === 0 ? (
                  <p>No hay usuarios disponibles.</p>
                ) : (
                  users.map((user:any) => (
                    <User 
                      key={user._id}
                      _id={user._id}
                      userName={user.userName}
                      email={user.email}
                      rol={user.rol}
                      imagenPerfil={user.imagenPerfil}
                      bonos={user.bonos}
                      refreshUsers={refreshUsers}
                    />
                  ))
              )}
            </div>
          </div>
        </Wrapper>
    </div>
  )
}

export default UsersList;
