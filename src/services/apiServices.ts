// url producción Vercel
// const API_URL = "https://bono-booking-back.vercel.app";
const API_URL = "http://localhost:3000";

// url local
// const LOCAL_URL = "http://localhost:3000";
const token = localStorage.getItem('token');

// LOGIN
export const login = async (userName:any, password:any) => {

  const objetoFinal = JSON.stringify({ userName, password });
  
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: objetoFinal,
  };

  try {
    const respuestaFinal = await fetch(`${API_URL}/users/login`, opciones);

    if (!respuestaFinal.ok) {
      throw new Error("Error al hacer login");
    }

    // Convertimos la respuesta a JSON
    const data = await respuestaFinal.json();

    if (data.token) {
      // guardamos el token una vez identificados, en el localStorage
      localStorage.setItem("token", data.token);
      return data; 

    } else {

      console.error('El token no está definido en la respuesta:', data);
      console.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }

  } catch (error) {
      console.error("Error durante el login:", error);
      throw error;
  }
};

//REGISTRO - NEW USER
export const registerUser = async (data:any) => {
  const opciones = {
    method: "POST",
    body: data, // Enviar directamente el FormData
    // headers: {
    //   "Content-Type": "application/json",
    // },
  };

  try {
    const response = await fetch(`${API_URL}/users/registro`, opciones);
    if (!response.ok) {
      throw new Error("Error en la solicitud de registro");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
};
