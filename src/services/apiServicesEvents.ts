// url producción
// const API_URL = "https://bono-booking-back.vercel.app";
const API_URL = "http://localhost:3000";

// url local
// const LOCAL_URL = "http://localhost:3000";


// crear nuevo evento
export const newEvent = async (data:any) => {
  const opciones = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${API_URL}/events/new-event`, opciones);
    if (!response.ok) {
      throw new Error("Error al crear el evento");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
};

//ver todos los eventos
export const getEvents = async () => {
  try {
      const response = await fetch(`${API_URL}/events/events-list`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
  }
};

// actualizar un evento (por ID)
export const updateEvent = async (id: any, userData: any) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

//ELIMINAR evento
export const deleteEvent = async (id: any) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

//Buscar un evento por nombre
export const getSearch = async (name: any) => {

  try {
    //El uso de encodeURIComponent(eventName) en la construcción de URLs con parámetros de consulta es una buena práctica que asegura que la URL sea válida y funcione correctamente, independientemente de los caracteres que contenga eventName.
    const response = await fetch(`${API_URL}/events?name=${encodeURIComponent(name)}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const events = await response.json();
    return events;

  } catch (error) {
    console.error('Error event:', error);
    throw error;
  }
  
}

export const getEventById = async (id: any) => {
  
  try {
    console.log('ID del evento:', id);
      const response = await fetch(`${API_URL}/events/${id}`); // URL del backend
      if (!response.ok) {
          throw new Error('Error al obtener el evento');
      }
      const events = await response.json();
      return events;
      
    } catch (error) {
      console.error('Error al obtener el evento:', error);
      throw error;
  }
}