import { useState, useEffect, useCallback } from 'react';

import Logo from '../../components/Logo/Logo.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import Notification from '../../components/Notification/Notification.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import { Event } from '../../components/Items/Event/Event.js';
import WrapperFiltros from '../../components/Forms/WrapperFiltros/WrapperFiltros.js';
import Button from '../../components/Button/Button.js';

import './EventList.css'

import { getEvents, getSearch } from '../../services/apiServicesEvents.js';


function EventList() {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');

    const refreshEvents = useCallback(async () => {
      try {
        const eventList = await getEvents();
        setEvents(eventList || []);  // Aseguramos que siempre sea un arreglo
      } catch (error:any) {
        console.error('Error fetching events:', error);
        setError(error.message || 'Error al obtener la lista de eventos');
      }
    }, []);
  
    // Cargar datos al montar el componente
    useEffect(() => {
      refreshEvents();
    }, []);
    
    const handleSearch = useCallback(async (e:any) => {
      e.preventDefault();
  
      if (!name) {
        setError("Por favor, ingrese un nombre antes de continuar");
        return; // No se envía la solicitud al no tener ningún campo
      }
  
      // Limpiar advertencia en caso de que se haya corregido el error
      setError(null);
  
      try {
        const result = await getSearch(name);
        setEvents(result); // Actualiza el estado con los eventos encontrados
        setError(''); // Limpia errores anteriores
        } catch (error:any) {
          console.error('Error en la búsqueda:', error);
          setError(error.message || 'No se pudieron encontrar eventos.');
          setEvents([]); // Limpia los resultados si hay un error
      }
    }, [name]);

    //cerrar la ventana de notificación
    const handleCloseNotification = useCallback(() => { 
      setError(null);
    }, []);

    const clearFilters = useCallback(() => {
      setError(null);
      refreshEvents();
    }, [refreshEvents]);

  return (
    <div className="p-event-list">
        <NavBar />

        <WrapperNav>
          <Logo color="blue" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>

        <Wrapper>
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}
          
          <div className="events">
            <h2 className='box-title'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="25">
                <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z"/>
                <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z"/>
              </svg>
              <span>Event</span> List
            </h2>
            <WrapperFiltros>
              <form onSubmit={handleSearch} className='form-filtros-event-list'>
                  <h3>Puedes realizar la búsqueda de eventos utilizando los siguientes filtros:</h3>
                  <div className='box-form-filtros'>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="nombre del evento"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='b-buttons'>
                      <Button color="dark" onClick={handleSearch} text="buscar" type="submit" />
                      <Button color="light" onClick={clearFilters} text="Limpiar Filtro" type="button"/>
                    </div>
                  </div>
                </form>
            </WrapperFiltros>
            <div className='list-events'>
              {events.length === 0 ? (
                  <p>No hay eventos disponibles.</p>
                ) : (
                  events.map((event:any) => (
                      <Event 
                        key={event._id}
                        id={event._id}
                        refreshEvents={refreshEvents}
                        // events={events}
                        nombre={event.name}
                        descripcion={event.description}
                        hora={event.hour}
                        fecha={event.date}
                        capacidad={event.capacity}
                      />
                  ))
              )}
            </div>
          </div>
        </Wrapper>
        
    </div>
  )
}

export default EventList;
