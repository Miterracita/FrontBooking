import Logo from '../../components/Logo/Logo.js';
import FormLogin from '../../components/Forms/FormLogin/FormLogin.js';

import './Login.css'

function Login() {

  return (
    <div className="login-page">      
        <Logo color="dark-blue" size='big'/>
        <FormLogin />
    </div>
  )
}

export default Login;
