import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from './utils/authUtils';

interface ProtectedRouteProps {
  isAdminRequired?: boolean;
}

const ProtectedRoute = ({ isAdminRequired = false }:ProtectedRouteProps ) => {

//verifica si el usuario está identificado y tiene un token válido
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />; // Redirige al login si no está autenticado
  }

  const userRole = getUserRole(); //obtiene el rol de usuario del token

  if (isAdminRequired && userRole !== "admin") {
    return <Navigate to="/new-booking" replace />; // Redirige a /new-booking si el usuario no es admin
  }

  // if (!isAdminRequired && userRole === "admin") {
  //   return <Navigate to="/gestion-usuarios" replace />; // Redirige a /gestion-usuarios si es admin
  // }

  return <Outlet />; // Si el usuario está identificado, tanto user como admin, permite el acceso a la ruta

};

export default ProtectedRoute;