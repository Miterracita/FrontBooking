import { memo, useCallback } from 'react';

import Notification from '../../../components/Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';
import FormEvent from '../../Forms/FormEvent/FormEvent.js';
import Modal from '../../Modal/Modal.js';

import { formatDate } from '../../../utils/date.js';

import './Event.css';

import useCommonReducer from '../../../reducers/useCommonReducer.js';

import { deleteEvent } from '../../../services/apiServicesEvents';


interface EventProps {
    id: string;
    nombre: string;
    descripcion?: string;
    fecha: string;
    hora: number;
    capacidad?: number;
    refreshEvents:() => void;
}

export const Event = memo (({ 
    id,
    nombre,
    descripcion,
    fecha,
    hora,
    capacidad,
    refreshEvents,
 }: EventProps): JSX.Element => {
    const {
        state,
        setError,
        setNotification,
        showModal,
        hideModal,
        clearMessages,
      } = useCommonReducer();

    const handleDeleteEvent = useCallback(async () => {
        try {
            const response = await deleteEvent(id);
            const message = response.message;
            setNotification(message || `Evento con id:${id} eliminado correctamente`);
            setError(null); // Limpiar errores anteriores
            
            setTimeout(() =>{
                clearMessages();
                refreshEvents(); // tardará 3 segundos antes de refrescar el listado de eventos y eliminar el mensaje
            }, 3000);
            
        } catch (error: any) {
            console.error('Error eliminando evento:', error);
            setError(error.message ? error.message : JSON.stringify(error) || 'Error eliminando evento'); // Si `error.message` no es string, convertir
        }
    }, [id, clearMessages, refreshEvents, setNotification, setError]);

    //abrir el modal con el formulario de eventos
    const handleUpdateEvent = useCallback(() => {
        showModal();
    }, [showModal]);

    //cerrar el modal
    const handleCloseModal = () => {
        hideModal(); // cerrar el modal
        refreshEvents();
    };

    return (
        <>
            <div className="c-event">

                {state.error && <Notification message={state.error} type="error" onClose={clearMessages} />}
                {state.notification && <Notification message={state.notification} type="success" onClose={clearMessages} />}
              
                <div className="box-event" key={id}>
                    <div className='info-event'>
                        <h3><span>{nombre}</span></h3>
                        <p><span>{descripcion}</span></p>
                        <p>Fecha: <span>{formatDate(fecha)}</span></p>
                        <p>Hora: <span>{hora}</span></p>                      
                        <p>Plazas: <span>{capacidad}</span></p>
                    </div>
                    <AdminBoxButtons
                        handleUpdate={handleUpdateEvent}
                        handleDelete={handleDeleteEvent}
                    />
                </div>
            </div>
            {state.showModal && (
                <Modal showModal={state.showModal} onCloseModal={handleCloseModal}>
                    <FormEvent
                        eventId={id}
                        onClose={handleCloseModal}
                        initialData={{
                            name: nombre,
                            description: descripcion,
                            date: fecha,
                            hour: hora,
                            capacity: capacidad,
                        }}
                    />
                </Modal>
            )}
        </>
    );
});
