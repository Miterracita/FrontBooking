import { memo, useCallback } from 'react';

import Notification from '../../Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';
import FormRegister from '../../Forms/FormRegister/FormRegister.js';
import Modal from '../../Modal/Modal.js';

import './User.css'

import useCommonReducer from '../../../reducers/useCommonReducer.js';

import { deleteUser } from '../../../services/apiServicesUsers.js';

// interface Booking {
//     _id: string;
//     fecha: Date;
//     bono: string; // ID del bono
//     // añadir más campos relevantes
// }

interface Bono {
    _id: string;
    name: string;
    type: string;
    active: boolean;
    code: string;
    totalUses: number,
    availableUses: number,
    expirationDate: Date,
    // reservas: Booking[];
}

export interface UserProps {
    _id: string;
    userName: string;
    email: string;
    rol: string;
    imagenPerfil?: string;
    bonos?: Bono[];
    refreshUsers: () => void; //funcion que se nos pasa desde userList
}

const User = memo (({
    _id,
    userName,
    email,
    rol,
    imagenPerfil,
    bonos = [],
    refreshUsers, 
 }: UserProps): JSX.Element => {
    const {
        state,
        setError,
        setNotification,
        showModal,
        hideModal,
        clearMessages,
      } = useCommonReducer();

    const imagenXDefecto = "https://res.cloudinary.com/dq2daoeex/image/upload/c_thumb,w_200,g_face/v1723660717/Proyecto10/oy1tksyz1ycc1edxcfqb.jpg";
    
    const handleDeleteUser = useCallback(async () => {
        try {
          const response = await deleteUser(_id);
          const message = response.message;
          setNotification(message || `Usuario eliminado correctamente`);
        
        setTimeout(() =>{
            clearMessages();
            refreshUsers();  // Llama a refreshBonos después de eliminar
          }, 3000);
          
        } catch (error: any) {
          console.error('Error deleting user:', error);
          setError(error.message || 'Error deleting user');
        }
      }, [_id, clearMessages, refreshUsers, setNotification, setError]);

    const handleUpdateUser= useCallback(() => {
        showModal()
    }, [showModal]);

    const handleCloseModal = () => {
        hideModal(); // cerrar el modal
        refreshUsers();
    };
    
    return (
        <div className='c-user'>

            {state.error && <Notification message={state.error} type="error" onClose={clearMessages} />}
            {state.notification && <Notification message={state.notification} type="success" onClose={clearMessages} />}
            
            <div className="box-user" key={_id}>
                <div className='info-user'>
                    <div className='img-box'>
                        <img src={imagenPerfil || imagenXDefecto} alt="imagen perfil" />
                    </div>
                    <div className='txt'>
                        <h3>{userName}</h3>
                        <p>Email: <span>{email}</span></p>
                        <p>Rol: <span>{rol}</span></p>
                        <p className='id'>ID: <span>{_id}</span></p>
                    </div>
                </div>
                <div className="bonos-list">
                    <h3>Bonos:</h3>
                    {bonos && bonos.length === 0 ? (
                        <p>No hay bonos disponibles para este usuario.</p>
                    ) : (
                        bonos.map(bono => (
                            <div key={bono._id} className="bono-item">
                                <h4>{bono.name}</h4>
                                <p>Activo: {bono.active ? 'Sí' : 'No'}</p>
                                {/* <h5>Reservas Asociadas:</h5>
                                    {bono.reservas && bono.reservas.length > 0 ? (
                                        <ul>
                                            {bono.reservas.map(reserva => (
                                                <li key={reserva._id}>
                                                    <span>Fecha: {new Date(reserva.fecha).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay reservas asociadas a este bono.</p>
                                    )} */}
                            </div>
                        ))
                    )}
                </div>
                <AdminBoxButtons
                    handleUpdate={handleUpdateUser}
                    handleDelete={handleDeleteUser}
                />
            </div>
            {state.showModal && (
                <Modal showModal={state.showModal} onCloseModal={handleCloseModal}>
                    <FormRegister
                        userId={_id}
                        onClose={handleCloseModal}// Prop para cerrar el formulario
                        initialData={{
                            userName: userName,
                            email: email,
                        }}
                    />
                </Modal>
            )}
        </div>
    );
});

export default User;