import { useState, useEffect, useCallback } from 'react';

import Logo from '../../components/Logo/Logo.js';
import NavBar from '../../components/NavBar/NavBar.js';
import SecondaryNavBar from '../../components/SecondaryNavBar/SecondaryNavBar.js';
import Notification from '../../components/Notification/Notification.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Booking from '../../components/Items/Booking/Booking.js';

import './BookingList.css'

import { getBooking } from '../../services/apiServicesBookings.js';


function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const refreshBookings = useCallback(async () => {
    try {
      const bookingList = await getBooking();
      console.log(bookingList);
      setBookings(bookingList || []);  // Aseguramos que siempre sea un arreglo
      console.log(bookingList)
      
    } catch (error:any) {
      console.error('Error al obtener la lista de reservas', error);
      setError(error.message || 'Error al obtener la lista de reservas');
    }
  }, []);

  useEffect(() => {
    refreshBookings(); //cargamos la lista de usuarios desde el back
  }, []);

  //cerrar la ventana de notificación
  const handleCloseNotification = useCallback(() => { 
    setError(null);
  }, []);

  return (
    <div className="booking-list">
      <NavBar />

      <WrapperNav>
        <Logo color="blue" size="medium" />
        <SecondaryNavBar />
      </WrapperNav>  

      <Wrapper>
      {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}

        <div className='bookings'>
          <h2 className='box-title'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25">
              <path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM5.683,16H1a1,1,0,0,1-1-1A6.022,6.022,0,0,1,5.131,9.084a1,1,0,0,1,1.1,1.266A6.009,6.009,0,0,0,6,12a5.937,5.937,0,0,0,.586,2.57,1,1,0,0,1-.9,1.43ZM17,24H7a1,1,0,0,1-1-1,6,6,0,0,1,12,0A1,1,0,0,1,17,24ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8Zm17,8H18.317a1,1,0,0,1-.9-1.43A5.937,5.937,0,0,0,18,12a6.009,6.009,0,0,0-.236-1.65,1,1,0,0,1,1.105-1.266A6.022,6.022,0,0,1,24,15,1,1,0,0,1,23,16Z"/>
            </svg>
            <span>Booking</span> List
          </h2>  
          <div className="list-bookings">
            {bookings && bookings.length === 0 ? (
                <p>No hay reservas disponibles.</p>
              ) : (
                bookings.map((booking:any) => (
                  <Booking 
                    key={booking._id}
                    _id={booking._id}
                    localizador={booking.localizador}
                    evento={booking.evento}
                    bono={booking.bono}
                    refreshBookings={refreshBookings}
                  />
                ))
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default BookingList;
