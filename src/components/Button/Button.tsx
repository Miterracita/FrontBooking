
import './Button.css';

export interface ButtonTypes {
  /** button color */
  color: 'generic' | 'dark' | 'blue' | 'light' | 'inactive' | 'red';
  
  /**button text */
  text: string;

  icon?: string;
  
  onClick?: (e:any) => void;

  type: 'submit' | 'button';
}


const Button = ({onClick, color, text, icon, type}: ButtonTypes): JSX.Element => {
  return (
    <div className="c-button">
        <button className={`btn btn-${color}`} onClick={onClick} type={type}>{icon}{text}</button>
    </div>
  )
};

export default Button;
