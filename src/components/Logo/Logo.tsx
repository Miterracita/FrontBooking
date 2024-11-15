
import './Logo.css';
import { LogoTypes } from './types/index';

const Logo = ({
  color,
  size,
}: LogoTypes): JSX.Element => {
  return (
    <div className="c-logo">
        <h1 className={`logo-${color} ${size}`}>Bono<span>Booking</span></h1>
    </div>
  )
};

export default Logo;
