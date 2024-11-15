import Button from "../Button/Button"

import './AdminBoxButtons.css';

interface AdminBoxButtonsProps {
    handleUpdate?: ()=> void,
    handleDelete?: ()=> void,
    handleOptionalButton?: ()=> void,
    txtOptionalButton?: string,
}

export const AdminBoxButtons = ({
    handleUpdate,
    handleDelete,
    handleOptionalButton,
    txtOptionalButton= 'Asignar',
}:AdminBoxButtonsProps):JSX.Element => {

    return (
        <div className="box-buttons-admin">
           {handleUpdate && (<Button onClick={handleUpdate} text="Editar" color={'generic'} type="button"/>)} 
           {handleDelete && (<Button onClick={handleDelete} text="Borrar" color={'red'} type="button"/>)}
           {handleOptionalButton && (<Button onClick={handleOptionalButton} text={txtOptionalButton} color={'dark'} type="button"/> )}               
        </div>
    )
}