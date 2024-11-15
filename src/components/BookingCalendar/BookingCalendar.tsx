// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import Button from '../Button/Button';
// import 'react-calendar/dist/Calendar.css';
// import './BookingCalendar.css';


// function FranjaHorariaSelector({ onSelect:any }) {

//   //Se le debería pasar una prop con una array donde aparezcan las diferentes posibilidades
//   const franjasHorarias = ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'];

//   return (
//     <div>
//       <h3>Horarios disponibles para la fecha indicada.</h3>
//       <select onChange={(e) => onSelect(e.target.value)}>
//         <option value="">Selecciona una franja horaria</option>
//         {franjasHorarias.map((franja, index) => (
//           <option key={index} value={franja}>{franja}</option>
//         ))}
//       </select>
//     </div>
//   );
// }


// function BookingCalendar() {
//     const [date, setDate] = useState(new Date());
//     const [franjaHoraria, setFranjaHoraria] = useState('');

//     const handleDateChange = (newDate:any) => {
//         setDate(newDate);
//     };

//     const handleFranjaHorariaChange = (franja:any) => {
//         setFranjaHoraria(franja);
//     };

//     const handleReserva = () => {
//         if (date && franjaHoraria) {
//         // Aquí puedes manejar la lógica para guardar la reserva y descontar usos del bono
//         console.log(`Reserva realizada para el ${date.toLocaleDateString()} en la franja horaria ${franjaHoraria}`);
//         } else {
//         console.log('Por favor, selecciona una fecha y una franja horaria.');
//         }
//     };

//     return (
//         <div className='c-calendario'>
//             <h2>Selecciona una fecha para tu reserva</h2>

//             <Calendar onChange={handleDateChange} value={date} />
//             <FranjaHorariaSelector onSelect={handleFranjaHorariaChange} />

//             <Button text="Reservar" color="dark" onClick={handleReserva}/>
//         </div>
//     );
// }

// export default BookingCalendar;
