import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.tsx';

// componentes a los que redirigen las rutas
import Login from './pages/Login/Login.js';

import Home from './pages/Home/Home.tsx';

import NewBono from './pages/NewBono/NewBono.tsx';
import NewEvent from './pages/NewEvent/NewEvent.tsx';
import NewBooking from './pages/NewBooking/NewBooking.tsx';

import UsersList from './pages/UsersList/UsersList.tsx';
import BonoList from './pages/BonoList/BonoList.tsx';
import BookingList from './pages/BookingList/BookingList.tsx';
import EventList from './pages/EventList/EventList.tsx';
import NewRegister from './pages/NewRegister/NewRegister.tsx';


// Configuración del router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true,
  },
  {
    path: '/new-user',
    element: <NewRegister />,
  },
  {
    element: <ProtectedRoute />,// Solo usuarios autenticados
    children: [
      { path: '/home', element: <Home /> },
    ],
  },
  {
    element: <ProtectedRoute />, // Solo usuarios autenticados
    children: [
      { path: '/home', element: <Home /> },
      // Rutas compartidas entre identificados y admin
      { path: '/new-booking', element: <NewBooking /> },
    ],
  },

  {
    element: <ProtectedRoute isAdminRequired={true} />,// Solo admin
    children: [
      { path: '/gestion-bonos', element: <BonoList />},
      { path: '/gestion-usuarios', element: <UsersList /> },
      { path: '/gestion-reservas', element: <BookingList /> },
      { path: '/gestion-eventos', element: <EventList /> },
      { path: '/new-bono', element: <NewBono /> },
      { path: '/new-event', element: <NewEvent /> },
    ],
  },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>, // Componente NotFound
  },
]);

export default router;