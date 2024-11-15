
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección

import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';

import { BonoData, EventData, FormBookingProps, UserData } from './types/index';
import { formatDate } from "../../../utils/date";

import './FormBooking.css';

import { newBooking, updateBooking } from "../../../services/apiServicesBookings";
import { getUserToken } from "../../../services/apiServicesUsers";
import { getBonosByUserId } from "../../../services/apiServicesBonos";
import { getEvents } from "../../../services/apiServicesEvents";


const FormBooking = ({
    bookingId,
    initialData,
    onClose
}: FormBookingProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Formulario
    const navigate = useNavigate(); // Hook para redirigir

    const [bonos, setBonos] = useState<BonoData[]>([]);
    const [user, setUser] = useState<UserData | null>(null);
    const [events, setEvents] = useState<EventData[]>([]);

    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null); //guardamos el evento seleccionado con su info completa
    const [selectedBono, setSelectedBono] = useState<BonoData | null>(null);
    // Para poder realizar la reserva es necesario cargar previamente la info
    // de usuarios, bonos y eventos

    // Sacamos la info del usuario que se ha identificado del token
    const fetchUserData = async () => {
        const token = localStorage.getItem("token"); // O la manera en que almacenas el token

        if (token) {
            try {
                const userData = await getUserToken(token);
                setUser(userData); // Guarda los datos del usuario en el contexto
                console.log(`El usuario identificado es ${userData.userName}`);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
                setError("No se pudo obtener la información del usuario.");
            }
        }
    };

    const fetchBonos = async () => {
        if (user && user._id) {
          try {
            const bonosData = await getBonosByUserId(user._id); // Llamada al servicio para obtener los bonos
            setBonos(bonosData);
            
            console.log("Bonos asignados al usuario:", bonosData);
      
            if (!bonosData || bonosData.length === 0) {
                setError("No tienes ningún bono disponible para realizar una reserva.");
            }
          } catch (error) {
            console.error("Error fetching bonos:", error);
            setError("Hubo un problema al obtener los bonos del usuario. Por favor, intenta de nuevo.");
          }
        }
    };     
    
    //fetch al listado de eventos
    const fetchEvents = async () => {
        try {
            const eventsData = await getEvents();
            setEvents(eventsData);
            console.log(eventsData);
        } catch (error: any) {
            setError(error.message || 'Error al cargar los eventos');
        }
    };

    //buscamos si el usuario tiene algún bono asignado
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            await fetchBonos();
            await fetchEvents();
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchBonos();
        }
    }, [user]);

    useEffect(() => {

        // Si bookingId está presente, estamos editando; de lo contrario, estamos creando una nueva reserva
        if (bookingId) {
            reset(initialData);  // Resetea el formulario con los datos de la reserva a editar
        } else {
            // Si es un nueva nueva reserva los datos se resetean
            reset();
        }
    }, [bookingId, initialData, reset]);


    //submit del formulario de edición o creación de nueva reserva
    const onSubmit = useCallback(async (formData: any) => {

        // Verificar los datos antes de enviar
        console.log("Datos del formulario:", formData); 

        if (!selectedBono) {
            console.error("No se seleccionó un bono.");
            setError("Por favor, selecciona un bono antes de continuar.");
            return;
        }

        // if (selectedBono.availableUses=== 0) {
        //     console.error("El bono seleccionado no tiene reservas disponibles, está inactivo");
        //     setError("El bono seleccionado está inactivo, no tiene reservas disponibles");
        //     return;
        // }
    
        try {
            const bookingData = {
                event: selectedEvent,
                bono: selectedBono,
                // Otros datos de la reserva, si son necesarios
            };
    
            if (bookingId) { //aquí actualizamos un reserva que ya existe
                await updateBooking(bookingId, bookingData);
                setNotification(`Reserva actualizada correctamente`);
    
                if (onClose) {
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }
            } else { // aquí creamos una nueva reserva
                await newBooking(bookingData);
                setNotification(`Reserva creada correctamente`);
    
                setTimeout(() => {
                    navigate('/new-booking'); 
                }, 2000);
            }
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message || (bookingId ? 'Error al actualizar la reserva' : 'Error al crear la reserva'));
        }
    }, [bookingId, navigate, onClose, selectedEvent, selectedBono]);

    //cerrar las notificaciones
    const handleCloseNotification = useCallback(() => { 
        setError(null);
        setNotification(null);
    }, []);

    const handleEventChange = (event: any) => {
        const eventId = event.target.value;
        const eventObject = events.find(e => e._id === eventId);
        if (eventObject) {
            setSelectedEvent(eventObject);
        } else {
            console.error("Evento no encontrado");
        }
    };

    const handleBonoChange = (event: any) => {
        const bonoId = event.target.value;
        const bonoObject = bonos.find(b => b._id === bonoId);
        if (bonoObject) {
            setSelectedBono(bonoObject);
        } else {
            console.error("Bono no encontrado");
        }
    };

  return (
    <div className="box-booking-form">
        {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}

        <form className="box-form-booking" id="bookingForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='box-title'>
                <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="50" height="50">
                        <path d="M17,10.039c-3.859,0-7,3.14-7,7,0,3.838,3.141,6.961,7,6.961s7-3.14,7-7c0-3.838-3.141-6.961-7-6.961Zm0,11.961c-2.757,0-5-2.226-5-4.961,0-2.757,2.243-5,5-5s5,2.226,5,4.961c0,2.757-2.243,5-5,5Zm1.707-4.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1-1c-.188-.188-.293-.442-.293-.707v-2c0-.552,.447-1,1-1s1,.448,1,1v1.586l.707,.707Zm5.293-10.293v2c0,.552-.447,1-1,1s-1-.448-1-1v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v1H11c.552,0,1,.448,1,1s-.448,1-1,1H2v9c0,1.654,1.346,3,3,3h4c.552,0,1,.448,1,1s-.448,1-1,1H5c-2.757,0-5-2.243-5-5V7C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z"/>
                    </svg> 
                </div>
                <h2><span>{bookingId ? 'Update' : 'New'}</span> Booking</h2>
            </div>         
            <div>
                <h3>Selecciona el evento sobre el que quieres realizar la reserva: </h3>
                <div className="box-event-list">
                    {events.map(event => (
                        <div key={event._id}>
                            <input
                                type="radio"
                                id={event._id}
                                value={event._id}
                                {...register("eventId")}
                                onChange={handleEventChange}
                            />
                            <label htmlFor={event._id}>
                                {event.name} - {formatDate(event.date)}
                            </label>
                            {errors.eventId && <span>{errors.eventId.message as string}</span>}
                        </div>
                    ))}
                </div>
            </div>
            <h3>Selecciona el bono que deseas utilizar:</h3>
            <div>
                {bonos && bonos.length > 0 ? (
                    bonos.map((bono) => (
                        <div key={bono._id}>
                            <div className="f-booking-item">
                                <input
                                    type="radio"
                                    id={bono._id}
                                    value={bono._id}
                                    {...register("bonoId", { required: "Debes seleccionar un bono" })}
                                    onChange={handleBonoChange}
                                />
                                <label htmlFor={bono._id}>
                                    {bono.name} - Código: {bono.code}
                                </label>
                                <p style={{color: 'red', visibility: errors.bonoId ? 'visible' : 'hidden'}}>
                                    {errors.bonoId && <span>{errors.bonoId.message as string}</span>}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tienes bonos disponibles.</p>
                )}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button text="Reservar" color="dark" type="submit"/>
            </div>

        </form>

    </div>
  )
};

export default FormBooking;
