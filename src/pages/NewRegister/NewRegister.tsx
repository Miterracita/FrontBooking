import Logo from '../../components/Logo/Logo.js';
import FormRegister from '../../components/Forms/FormRegister/FormRegister.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';

import './NewRegister.css'
import { NavLink } from 'react-router-dom';


function NewRegister() {

  return (
    <div className="register-page">  
      <nav className='nav-bar'>
        <ul>
          <li>
            <NavLink to="/" >Home</NavLink>
          </li>
        </ul>
      </nav>
      <WrapperNav>
        <Logo color="dark" size="medium" />
      </WrapperNav>    
      <Wrapper>
        <FormRegister />
      </Wrapper>
    </div>
  )
}

export default NewRegister;
