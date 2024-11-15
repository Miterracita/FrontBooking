import './BonoUser.css';

export interface UserData {
  _id: string;
  userName: string;
  email: string;
  rol: string;
}
export interface BonoData {
  _id: string;
  name: string;
  type: number,
  active: boolean,
  code: string,
  user?: UserData;
  totalUses: number,
  availableUses: number,
  expirationDate?: string,
  reservations: Reservation[];
}
export interface EventData {
  _id: string;
  name: string;
  description?: string;
  date: string;
  hour: number;
  capacity?: number;
}
export interface Reservation {
  _id: string;
  localizador: string; // O el tipo adecuado para la fecha
  bono: BonoData; // O el tipo adecuado para el estado
  evento: EventData; // O el tipo adecuado para el estado
}

export interface BonoUsersTypes {
  id: string;
  name: string;
  type: number,
  active: boolean,
  code: string,
  totalUses?: number,
  availableUses?: number,
  expirationDate?: string,
  reservations: Reservation[];
}

const BonoUsers = ({
    type,
    id,
    name,
    active,
    code,
    totalUses, //usos del bono = type
    availableUses, //usos disponibles --> totalReservations
    expirationDate, // fecha caducidad
    reservations, //reservas
}: BonoUsersTypes): JSX.Element => {
  console.log({ id, name, type, active, code, totalUses, availableUses, expirationDate, reservations });

    if (availableUses === 0) {
      active = false;
    }
    
  return (
    <div className="c-bono-user">
        <div className='box-bono-user'>
          <h4>Bono {type} - Reservas</h4>
          <div className='top-flex'>
            <p>{code}</p>
            <div className='ico-state'>
              {active ? (
                <div className='ico-activo'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#06D001">
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
                  </svg>
                </div>
              ) : (
                <div className='ico-inactivo'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#A02334">
                    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className='content'> 
            <div id={id}>
              <div className='box-reservas'>
                <ul>
                  {Array.from({ length: type }, (_, index) => (
                    <li key={index} className={index < (availableUses ?? 0) ? 'available' : 'reserved'}></li>
                  ))}
                </ul>
              </div>
              <h5><span>Usos del bono:</span> {totalUses}</h5>
              <h5><span>Reservas disponibles:</span> {availableUses}</h5>
              <h5><span>Fecha caducidad:</span></h5>
              <h5>{expirationDate}</h5>
              
            </div>
          </div>

        </div>
    </div>
  )
};

export default BonoUsers;
