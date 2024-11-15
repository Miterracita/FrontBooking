
import { useState, useEffect } from 'react';
import './Notification.css';


interface NotificationProps {
  message: string | null;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification = ({ message, type, onClose }:NotificationProps) => {
  const [visible, setVisible] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  if (!message || !visible) return null;

  return (
    <div
      className={`notification ${type}`}     
    >
      <div>{message}</div>
      <div
        className='close'
        onClick={() => {
          setVisible(false); // cierra la notificacion
          onClose();
        }}
        title={hover ? 'Haz click para cerrar' : ''}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
          <path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z"/><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>
        </svg>
      </div>      
    </div>
  );
};

export default Notification;
