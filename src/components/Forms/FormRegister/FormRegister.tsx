
import { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';


import './FormRegister.css';

import { registerUser } from '../../../services/apiServices';
import { updateUser } from '../../../services/apiServicesUsers';

export interface UserData {
    userName: string,
    email: string,
}

interface FormRegisterProps {
    userId?: string;
    initialData?: UserData;
    onClose?: () => void;
}

const FormRegister = ({
    userId,
    initialData,
    onClose,
}: FormRegisterProps) => {
    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Hook para redirigir


    useEffect(() => {
        // Si userId está presente, estamos editando; de lo contrario, estamos creando uno nuevo
        if (userId) {
            reset(initialData);  // Resetea el formulario con los datos del user existente
        } else {
            reset();
        }
    }, [userId, initialData, reset]);

    const onSubmit = useCallback(async (formData:any) => {   
        const data = new FormData();
        data.append('email', formData.email);
        data.append('userName', formData.userName);
        data.append('password', formData.password);
        if (formData.img[0]) {
            data.append('imagenPerfil', formData.img[0]);
        }

        console.log([...data]);
        
        try {
            if (userId) {
                // Actualiza el usuario si existe userId
                await updateUser(userId, data);
                setNotification(`Usuario actualizado correctamente`);
                // Agregar un retraso antes de cerrar el modal
                {onClose&& (
                    setTimeout(() => {
                        onClose();
                    }, 2000)
                )}

            } else {
                // Crea un nuevo usuario si no existe userId
                const result = await registerUser(data);
                setNotification(`Usuario creado correctamente`);

                //guardamos el token
                localStorage.setItem('token', result.token);

                setTimeout(() => {
                    navigate('/home');
                }, 2000)  
            }
        
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || (userId ? 'Error al actualizar el usuario' : 'Error al crear el usuario'));
        }
    }, [userId, navigate, onClose]);

    //cerrar la ventana de notificación
    const handleCloseNotification = () => { 
        setError(null);
        setNotification(null);
    };

  return (
    <div className="box-register-form">
        {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}

        <form className="box-form-register" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='box-title'>
                <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"></path>
                    <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z"></path>
                    <path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z"></path>
                </svg>
                </div>
                <h2><span>{userId ? 'Update' : 'New'}</span> user register</h2>
            </div>

            <div className='flex'>                
                <div className='box-item'>
                    <label>UserName: </label>
                    <input type="text" id="username" {...register("userName", {
                        required: {
                            value: true,
                            message: "Necesitas introducir un username para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.userName ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.userName ? 'visible' : 'hidden'}}>
                        {errors.userName && <span>{errors.userName.message as string}</span>}
                    </p>
                </div>
                {!userId ? (
                    <div className='box-item'>
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
                            {errors.password && <span>{errors.password.message as string}</span>}
                        </p>
                    </div>
                ): false}
            </div>
            <div className='box-item'>
                <label>Email: </label>
                <input type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Necesitas introducir un email para poder continuar"
                    },
                })}
                style={{ borderColor: errors.email ? "red" : "" }}/>
                <p style={{color: 'red', visibility: errors.email ? 'visible' : 'hidden'}}>
                    {errors.email && <p>{errors.email.message as string}</p>}
                </p>
            </div>      
            <div className='box-item'>
                <label>Avatar: </label>
                <input type="file" id="img" {...register("img")} />
            </div> 
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button text="Guardar" color="dark" type="submit"/>
            </div>
        </form>
    </div>
  )
};

export default FormRegister;