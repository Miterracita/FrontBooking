import Logo from '../../components/Logo/Logo.js';
import FormEvent from '../../components/Forms/FormEvent/FormEvent.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';

import './NewEvent.css'


function NewEvent() {

  return (
    <div className="register-page">      
        <NavBar />
        <WrapperNav>
          <Logo color="dark" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>
        <Wrapper>
          <FormEvent />
        </Wrapper>
        
    </div>
  )
}

export default NewEvent;
