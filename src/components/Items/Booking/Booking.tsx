import { memo, useCallback } from 'react';

import Notification from '../../Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';
import FormBooking from '../../Forms/FormBooking/FormBooking.js';
import Modal from '../../Modal/Modal.js';

import './Booking.css';

import useCommonReducer from '../../../reducers/useCommonReducer.js';

import { deleteBooking } from '../../../services/apiServicesBookings.js';

export interface Bono {
    _id: string;
    name: string;
    type: number,
    active: boolean,
    code: string,
    // user?: UserData;
    totalUses: number,
    availableUses: number,
    expirationDate?: string,
}

export interface Evento {
    _id: string;
    name: string;
    description?: string;
    date: string;
    hour: number;
    capacity?: number;
}

export interface BookingProps {
    _id: string;
    localizador: string;
    evento: Evento;
    bono: Bono;
    refreshBookings: () => void; //funcion que se nos pasa desde userList
}

const Booking = memo (({
    _id,
    localizador,
    evento,
    bono,
    refreshBookings,
}: BookingProps): JSX.Element => {
    const {
        state,
        setError,
        setNotification,
        showModal,
        hideModal,
        clearMessages,
    } = useCommonReducer();
    console.log("Recibiendo datos:", evento); // este componente recibe sólo el id del evento, debería recibir un objeto

    const handleDeleteBooking = useCallback(async () => {
        try {
            const response = await deleteBooking(_id);
            const message = response.message;
            setNotification(message || `Reserva eliminada correctamente`);
        
        setTimeout(() =>{
            clearMessages();
            refreshBookings();  // Llama a refreshBookings después de eliminar
            }, 3000);
            
        } catch (error: any) {
            console.error('Error deleting booking:', error);
            setError(error.message || 'Error deleting booking');
        }
    }, [_id, clearMessages, refreshBookings, setNotification, setError]);

    const handleUpdateBooking= useCallback(() => {
        showModal()
    }, [showModal]);

    const handleCloseModal = () => {
        hideModal(); // cerrar el modal
        refreshBookings();
    };

    return (
        <div className='c-booking'>

            {state.error && <Notification message={state.error} type="error" onClose={clearMessages} />}
            {state.notification && <Notification message={state.notification} type="success" onClose={clearMessages} />}
            
            <div className="box-booking" key={_id}>
                <div className='info-booking'>
                    <div className='txt'>
                        <h3>Localizador: {localizador}</h3>
                        <p>Bono: {bono.code}</p>
                        <p>Evento ID: {evento._id}</p>
                        <p>Evento: {evento.name}</p>
                        <p>Fecha: {evento.date}</p>
                    </div>
                </div>
                <AdminBoxButtons
                    handleUpdate={handleUpdateBooking}
                    handleDelete={handleDeleteBooking}
                />
            </div>
            {state.showModal && (
                <Modal showModal={state.showModal} onCloseModal={handleCloseModal}>
                    <FormBooking
                        bookingId={_id}
                        onClose={handleCloseModal}// Prop para cerrar el formulario
                        // initialData={{
                        //     _id: _id,
                        //     localizador: localizador,
                        // }}
                        initialData={{ evento, bono, _id }}
                    />
                </Modal>
            )}
        </div>
    );
});

export default Booking;