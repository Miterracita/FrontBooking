import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Nav.css';


const Nav = () => {
  return (
    <nav className='nav-bar'>
      <ul>
        <li>
          <NavLink to="/home" >
            <Logo color="blue" size="small" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
