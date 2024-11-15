import { NavLink } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <ul>
        <li>
          <NavLink to="/new-booking">New Booking</NavLink>
        </li>
        <li>
          <NavLink to="/gestion-reservas">Booking List</NavLink>
        </li>
        <li>
          <NavLink to="/gestion-usuarios">Users List</NavLink>
        </li>
        <li>
          <NavLink to="/gestion-eventos">Events List</NavLink>
        </li>
        <li>
          <NavLink to="/gestion-bonos">Bonos List</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
