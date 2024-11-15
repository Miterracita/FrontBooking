import { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';

import { newBono, getBono, updateBono } from '../../../services/apiServicesBonos'; // Importa updateBono
import { getUsers } from '../../../services/apiServicesUsers';

import './FormBono.css';

export interface BonoData {
    user?: UserData;
    expirationDate?: string;
    type?: string;
}

export interface UserData {
    _id: string;
    userName: string;
    email: string;
    rol: string;
}

interface FormBonoProps {
    bonoId?: string;
    initialData?: BonoData;
    onClose: () => void;
}

const FormBono = ({
    bonoId,
    initialData,
    onClose,
}:FormBonoProps)  => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Hook para redirigir

    const [users, setUsers] = useState<UserData[]>([]); 
    const [bonoTypes, setBonoTypes] = useState<string[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

            // Fetch users from the API
            const fetchAllUsers = async () => {
                try {
                    const usersData = await getUsers();
                    setUsers(usersData);
                } catch (error: any) {
                    setError(error.message || 'Error deleting user');
                }
            };
    
            // Fetch bono types from the API
            const fetchBonoTypes = async () => {
                try {
                    const bonoData = await getBono();
                    const types: string[] = bonoData.map((bono:any) => bono.type);
                    const uniqueTypes = Array.from(new Set(types)); //para eliminar duplicados
                    setBonoTypes(uniqueTypes);
                } catch (error:any) {
                    setError(error.message || 'Error fetching bono types:');
                }
            };

    useEffect(() => {
        fetchAllUsers();
        fetchBonoTypes();
    }, []);

    useEffect(() => {

        // Si bonoId está presente, estamos editando; de lo contrario, estamos creando uno nuevo
        if (bonoId) {
            reset(initialData);  // Resetea el formulario con los datos del bono existente
        } else {
            // Si es un nuevo bono, puedes establecer valores predeterminados aquí
            reset();
        }
    }, [bonoId, initialData, reset]);

    const onSubmit = useCallback(async (formData:any) => {
                
        try {
            if (bonoId) {
                // Actualiza el bono si existe bonoId
                await updateBono(bonoId, formData);
                setNotification(`Bono actualizado correctamente`);

                setTimeout(() => {
                    onClose();
                }, 2000)

            } else {
                // Crea un nuevo bono si no existe bonoId
                await newBono(formData);
                console.log(`Bono creado correctamente`);
                setNotification(`Bono creado correctamente`);

                setTimeout(() => {
                    navigate('/gestion-bonos'); // Redirige después de crear el bono
                }, 2000)               
            }
        
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || (bonoId ? 'Error al actualizar el bono' : 'Error al crear el bono'));
        }
    }, [bonoId, navigate, onClose]);

      

    //cerrar la ventana de notificación
    const handleCloseNotification = useCallback(() => { 
        setError(null);
        setNotification(null);
    }, []);

    return (
        <div className="box-bono-form">
            {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
            {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}

            <form className="box-form-bono" id="bonoForm" onSubmit={handleSubmit(onSubmit)}>

                <div className='box-title'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                        <path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"></path>
                        <path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"></path>
                        <path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"></path>
                        <path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"></path>
                    </svg>
                    <h2><span>{bonoId ? 'Update' : 'New'}</span> Bono</h2>
                </div>

                {!bonoId && (
                    <>
                    <div className='box-item-bono'>
                        <label>Selecciona el tipo de bono que quieres dar de alta.</label>
                        <p>El tipo de bono corresponde al número de usos disponibles: </p>

                        <select id="type" {...register("type", {
                            required: {
                                value: true,
                                message: "Necesitas seleccionar un tipo de bono"
                            },
                        })}
                        style={{ borderColor: errors.type ? "red" : "" }}>
                            <option value="">Tipos de bonos disponibles.</option>
                            {bonoTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <p style={{color: 'red', visibility: errors.type ? 'visible' : 'hidden'}}>
                            {errors.type && <span>{errors.type.message as string}</span>}
                        </p>
                    </div>
                    </>
                )}

                <div className='box-item-bono'>
                    <label>¿Quieres asignar el bono a un usuario?: </label>
                    <select id="user" {...register("user")}>
                        <option value="">Usuarios disponibles</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.userName}</option>
                        ))}
                    </select>
                </div>
                <div className='box-item-bono'>
                    <label>Puedes asignar una fecha de expiración: </label>
                    <input type="date" id="expirationDate" {...register("expirationDate")} />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <Button text="Guardar" color="dark" type="submit"/>
                </div>
            </form>
        </div>
    );
};

export default FormBono;
