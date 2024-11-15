import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import NavBar from '../../components/NavBar/NavBar.js';
import FormBooking from '../../components/Forms/FormBooking/FormBooking.js';
import BonoUsers from '../../components/Items/BonoUser/BonoUser.js';
import Logo from '../../components/Logo/Logo.js';
import Modal from '../../components/Modal/Modal.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Notification from '../../components/Notification/Notification.tsx';

import './NewBooking.css'

import { BonoData, UserData } from '../../components/Forms/FormBooking/types/index.ts';

import { getUserToken } from '../../services/apiServicesUsers.ts';
import { getBonosByUserId } from '../../services/apiServicesBonos.ts';
import { formatDate } from '../../utils/date.ts';

import useCommonReducer from '../../reducers/useCommonReducer.tsx';

const NewBooking =() => {
  const { state, setError, showModal, hideModal, clearMessages } = useCommonReducer();
  const [bonos, setBonos] = useState<BonoData[] | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  
    // Sacamos la info del usuario que se ha identificado del token
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
            const userData = await getUserToken(token);
            setUser(userData);
        } catch (error) {
            setError("No se pudo obtener la información del usuario.");
        }
      }
    };

    const fetchBonos = async () => {
        if (user && user._id) {
          try {
            const bonosData = await getBonosByUserId(user._id);
            setBonos(bonosData);
            
            console.log("Bonos asignados al usuario:", bonosData);
      
            if (!bonosData || bonosData.length === 0) {
              setError("No tienes ningún bono disponible para realizar una reserva.");
            }
          } catch (error) {
            setError("Hubo un problema al obtener los bonos del usuario. Por favor, intenta de nuevo.");
          }
        }
    };

    useEffect(() => {
      fetchUserData();
    }, []);
  
    useEffect(() => {
      if (user) {
        fetchBonos();
      }
    }, [user]);

    const handleNewBooking = useCallback(() => {
      showModal();
    }, [showModal]);//abrir el modal con el formulario de bono
  
    const handleCloseModal = useCallback(() => {
      hideModal();
    }, [hideModal]);
    
  return (
    <div className="new-booking-page">
        {state.error && <Notification message={state.error} type="error" onClose={clearMessages} />}
        {state.notification && <Notification message={state.notification} type="success" onClose={clearMessages} />}
     
        <NavBar />    
        <WrapperNav>
          <div className='secondary-nav'>
            <Logo color="blue" size="medium" />
            <ul className='btn-new-booking'>
              <li>
                <Link to="/new-booking" className='link-box' onClick={handleNewBooking}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M17,10.039c-3.859,0-7,3.14-7,7,0,3.838,3.141,6.961,7,6.961s7-3.14,7-7c0-3.838-3.141-6.961-7-6.961Zm0,11.961c-2.757,0-5-2.226-5-4.961,0-2.757,2.243-5,5-5s5,2.226,5,4.961c0,2.757-2.243,5-5,5Zm1.707-4.707c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-1-1c-.188-.188-.293-.442-.293-.707v-2c0-.552,.447-1,1-1s1,.448,1,1v1.586l.707,.707Zm5.293-10.293v2c0,.552-.447,1-1,1s-1-.448-1-1v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v1H11c.552,0,1,.448,1,1s-.448,1-1,1H2v9c0,1.654,1.346,3,3,3h4c.552,0,1,.448,1,1s-.448,1-1,1H5c-2.757,0-5-2.243-5-5V7C0,4.243,2.243,2,5,2h1V1c0-.552,.448-1,1-1s1,.448,1,1v1h8V1c0-.552,.447-1,1-1s1,.448,1,1v1h1c2.757,0,5,2.243,5,5Z"/>
                  </svg>            
                  New Booking
                </Link>
              </li>
            </ul>
          </div>
        </WrapperNav>
        <Wrapper>
          <div className='box-new-booking'>
            <h2 className='box-title-booking'>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#229799">
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
              </svg>
              {user && (
                <>
                  Hola
                  <span>{user.userName}</span>.
                </>
              )}
            </h2>
            <p>Estos son tus bonos:</p>
            <div className='box-new-booking-bonos'>
                {bonos ? (
                    bonos.map((bono: any) => (
                        <BonoUsers 
                          key={bono._id}
                          type={bono.type}
                          active={bono.active}
                          reservations={bono.reservations}
                          id={bono._id}
                          expirationDate={formatDate(bono.expirationDate)}
                          name={bono.name}
                          code={bono.code}
                        />
                    ))
                ) : (
                    <p>No tienes bonos disponibles.</p>
                )}
            </div>
            {state.showModal && (
              <Modal showModal={state.showModal} onCloseModal={handleCloseModal}>   
                <FormBooking />
              </Modal>
            )}
          </div>
        </Wrapper>
    </div>
  )
}

export default NewBooking;
