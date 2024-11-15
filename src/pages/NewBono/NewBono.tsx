import Logo from '../../components/Logo/Logo.js';
import FormBono from '../../components/Forms/FormBono/FormBono.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';

import './NewBono.css'


function NewBono() {

  return (
    <div className="register-page">      
        <NavBar />
        <WrapperNav>
          <Logo color="dark" size="medium" />
          <SecondaryNavBar />
        </WrapperNav>
        <Wrapper>
          <FormBono onClose={()=>{console.log('close')}}/>
        </Wrapper>
        
    </div>
  )
}

export default NewBono;
