//obtener el token de acceso del localStorage
export const getAccessToken = () => localStorage.getItem("token");

// Verifica si el usuario está autenticado
export const isAuthenticated = () => !!getAccessToken();

// Decodificar el token para obtener el rol del usuario
export const getUserRole = () => {
    
  const token = getAccessToken();
  
  if (!token){
    console.log('token no encontrado');
    return null;
  } 

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
    const rol = payload.rol; // Accede directamente a 'rol' en el payload
    console.log("Rol en payload:", rol); // Verifica el rol, si existe

    return payload.rol || null;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};