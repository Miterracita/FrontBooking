export interface UserData {
    _id: string;
    userName: string;
    email: string;
    rol: string;
}

export interface Reservation {
    _id: string;
    localizador: string;
    bono: BonoData;
    evento: EventData;
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

export interface BookingData {
    _id?: string;
    localizador?: string;
    evento?: EventData;
    bono?: BonoData; //aquí se tiene que enviar como objeto, no como array
}

export interface FormBookingProps {
    bookingId?: string;
    initialData?: BookingData;
    onClose?: () => void;
}
