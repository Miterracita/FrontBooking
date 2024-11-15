
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
import Button from '../../Button/Button';
import { useForm } from "react-hook-form";
import { login } from '../../../services/apiServices';
import { Link } from 'react-router-dom';
import { getUserRole } from '../../../utils/authUtils';

import './FormLogin.css';

const FormLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            password: ''
        }
    });
    
    const navigate = useNavigate(); // Hook para redirigir

    const onSubmit = async (formData:any) => {
        
        try {
          // Llamamos a la función de login que hace la petición al backend
          const response = await login(formData.userName, formData.password);
  
          if (response.token) {
            // Si el login es exitoso, guardamos el token en el localStorage
            localStorage.setItem("token", response.token);

            // Obtiene el rol del usuario desde el token decodificado
            const userRole = getUserRole();

            // Redirige según el rol del usuario
            if (userRole === 'admin') {
                navigate('/gestion-usuarios'); // Ruta para admins
            } else {
                navigate('/new-booking'); // Ruta para users
            }

          } else {
            console.error('Error en la respuesta:', response);
            alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
          }
        } catch (error) {
          console.error('Error en la conexión:', error);
          alert("Error en la conexión. Por favor, inténtalo de nuevo.");
        }
      };

  return (
    <div className="box-login-form">
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="box-form">
                <div className='box-item-user'>
                    <label>UserName: </label>
                    <input type="text" id="username" {...register("userName", {
                        required: {
                            value: true,
                            message: "Necesitas introducir un username para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.userName ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.userName ? 'visible' : 'hidden'}}>
                        {errors.userName ? errors.userName.message : ''}
                    </p>
                </div>
                <div className='box-item-user'>
                    <label>Password: </label>
                    <input type="password" id="password" {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es obligatoria"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
                            message:
                            "La contraseña debe incluir números, letras Mayúsculas y minúsculas y como máximos 8 caracteres",
                        },
                    })}
                    style={{ borderColor: errors.password ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.password ? 'visible' : 'hidden'}}>
                        {errors.password ? errors.password.message : ''}
                    </p>
                </div>

                <Button text="Enviar" color="dark" type='submit'/>
            </div>
        </form>

        <div className="box-info">
            <div className="flex">
                <p className="txt">Si no estás registrado <Link to="/new-user">Regístrate</Link></p>
            </div>
            <div className="flex">
                <p className="txt">Si no recuerdas tu userName o password - <a href="">Recordar</a></p>
            </div>
        </div>
    </div>
  )
};

export default FormLogin;
