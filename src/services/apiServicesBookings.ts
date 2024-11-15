// url producción
const API_URL = "https://bono-booking-back.vercel.app";
// const API_URL = "http://localhost:3000";


// url local
// const LOCAL_URL = "http://localhost:3000";


// nuevo reserva
export const newBooking = async (data:any) => {
  const opciones = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("Enviando datos de la reserva:", data);
    const response = await fetch(`${API_URL}/bookings/new-booking`, opciones);
    if (!response.ok) {
      throw new Error("Error al crear la reserva");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error durante la creación de la reserva:", error);
    throw error;
  }
}

//ver todos las reservas
export const getBooking = async () => {
  try {
      const response = await fetch(`${API_URL}/bookings/bookings-list`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching reservas:', error);
      throw error;
  }
};

// actualizar una reserva (por ID)
export const updateBooking = async (id: any, userData: any) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
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
    console.error('Error updating booking:', error);
    throw error;
  }
};

//ELIMINAR una reserva
export const deleteBooking = async (id: any) => {
  console.log("Attempting to delete booking with ID:", id);
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

//APLICAR FILTROS
// buscar reservas por username o codigo
export const getSearchBooking = async (user: string, code: string) => {
  try {
      // Crear un objeto para almacenar los parámetros de búsqueda
      const queryParams = new URLSearchParams();

      // Agregar parámetros si están definidos
      if (user) {
          queryParams.append('user', user);
      }
      if (code) {
          queryParams.append('code', code);
      }

      const response = await fetch(`${API_URL}/bookings/search?${queryParams.toString()}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
      
    } catch (error) {
        console.error('Error fetching bonos:', error);
        throw error;
    }
};
