// url producción
// const API_URL = "https://bono-booking-back.vercel.app";
const API_URL = "http://localhost:3000";


// url local
// const LOCAL_URL = "http://localhost:3000";


// nuevo bono
export const newBono = async (data:any) => {
  const opciones = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${API_URL}/bonos/new-bono`, opciones);
    if (!response.ok) {
      throw new Error("Error al crear el bono");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error durante la creación del bono:", error);
    throw error;
  }
}

//ver todos los bonos
export const getBono = async () => {
  try {
      const response = await fetch(`${API_URL}/bonos/bono-list`);
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

// actualizar un bono (por ID)
export const updateBono = async (id: any, userData: any) => {
  try {
    const response = await fetch(`${API_URL}/bonos/${id}`, {
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
    console.error('Error updating bono:', error);
    throw error;
  }
};

//ELIMINAR Bono
export const deleteBono = async (id: any) => {
  console.log("Attempting to delete bono with ID:", id);
  try {
    const response = await fetch(`${API_URL}/bonos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting bono:', error);
    throw error;
  }
};

//APLICAR FILTROS
// buscar bonos por username o codigo
export const getSearch = async (user: string, code: string) => {
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

      const response = await fetch(`${API_URL}/bonos/search?${queryParams.toString()}`);
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

// Obtener bonos por ID de usuario
export const getBonosByUserId = async (userId: any) => {
  try {
      // Realizar la llamada para obtener los bonos del usuario usando su ID
      const response = await fetch(`${API_URL}/bonos/${userId}`); // Asegúrate de que esta sea la URL correcta para la API de bonos

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data; // Devuelve los bonos del usuario

  } catch (error) {
      console.error('Error fetching bonos:', error);
      throw error; // Propaga el error si ocurre
  }
};
