
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';

import { newEvent, updateEvent } from '../../../services/apiServicesEvents';

import './FormEvent.css';

interface EventData {
    name: string;
    description?: string;
    date: string;
    hour: number;
    capacity?: number;
}

interface FormEventProps {
    eventId?: string;
    initialData?: EventData;
    onClose?: () => void;
}
const FormEvent = ({
    eventId,
    initialData,
    onClose,
}: FormEventProps) => {
    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {

        // Si eventId está presente, estamos editando; de lo contrario, estamos creando uno nuevo
        if (eventId) {
            reset(initialData);  // Resetea el formulario con los datos del bono existente
        } else {
            reset();
        }
    }, [eventId, initialData, reset]);

    const onSubmit = useCallback(async (formData:any) => {
        try {
            if (eventId) {

                // Actualiza el bono si existe bonoId
                await updateEvent(eventId, formData);
                setNotification(`Evento actualizado correctamente`);

                // Agregar un retraso antes de cerrar el modal
                {onClose&& (
                    setTimeout(() => {
                        onClose();
                    }, 2000)
                )}

            } else {

                // Crea un nuevo bono si no existe bonoId
                const result = await newEvent(formData);
                console.log("Evento creado correctamente:", result);
                setNotification("Evento creado correctamente:");

                setTimeout(() => {
                    navigate('/gestion-eventos'); // Redirige después de crear el evento
                }, 2000)               
            }
        
            } catch (error: any) {
                console.error('Error durante la creación del evento:', error);
                setError(error.message || (eventId ? 'Error al actualizar el evento' : 'Error al crear el evento'));
        }
    }, [eventId, navigate, onClose]);

    const handleCloseNotification = useCallback(() => { 
        setError(null);
        setNotification(null);
    }, []);


  return (
    <div className="box-event-form">
        {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}

        <form className="box-form-event" id="eventForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='box-title'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="25">
                    <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z"></path>
                    <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z"></path>
                </svg>
                <h2><span>{eventId ? 'Update' : 'New'}</span> Event</h2>
            </div>
            <div>                
                <div className='box-item-event'>
                    <label>Nombre: </label>
                    <input type="text" id="name" {...register("name", {
                        required: !eventId ? {
                            value: true,
                            message: "Necesitas introducir un nombre para poder continuar"
                        }: false,
                    })}
                    style={{ borderColor: errors.name ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.name ? 'visible' : 'hidden'}}>
                        {errors.name && <span>{errors.name.message as string}</span>}
                    </p>
                </div>
            </div>
            <div>                
                <div className='box-item-event'>
                    <label>Descripción: </label>
                    <input type="textarea" id="description" {...register("description")}
                    style={{ borderColor: errors.description ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.description ? 'visible' : 'hidden'}}>
                        {errors.description && <span>{errors.description.message as string}</span>}
                    </p>
                </div>
            </div>
            <div className='flex-event'>                
                <div className='box-item-event'>
                    <label>Fecha: </label>
                    <input type="date" id="date" {...register("date", {
                        required: !eventId ? {
                            value: true,
                            message: "Necesitas introducir una fecha para poder continuar"
                        }: false,
                    })}
                    style={{ borderColor: errors.date ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.date ? 'visible' : 'hidden'}}>
                        {errors.date && <span>{errors.date.message as string}</span>}
                    </p>
                </div>
                <div className='box-item-event'>
                    <label>Hora: </label>
                    <input type="time" id="hour" {...register("hour", {
                        required: !eventId ? {
                            value: true,
                            message: "Necesitas introducir una hora para poder continuar"
                        }: false,
                    })}
                    style={{ borderColor: errors.hour ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.hour ? 'visible' : 'hidden'}}>
                        {errors.hour && <span>{errors.hour.message as string}</span>}
                    </p>
                </div>
                <div className='box-item-event'>
                    <label>Capacidad total del evento: </label>
                    <input type="number" id="capacity" {...register("capacity")} />
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button text="Guardar" color="dark" type="submit"/>
            </div>
        </form>
    </div>
  )
};

export default FormEvent;