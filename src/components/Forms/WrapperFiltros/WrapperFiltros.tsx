import { useState, ReactNode } from 'react';

import './WrapperFiltros.css';

type WrapperFiltrosProps = {
    children: ReactNode;
  };

const WrapperFiltros = ({ children }: WrapperFiltrosProps) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(prevShow => !prevShow);
    };

    return (
        <div className="wrapper-filtros">
            <div className='box-title-filtros' onClick={toggleShow}>
                <div className="title-filtros">
                    {show ? 
                        (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                                <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/>
                            </svg>
                            <h3>OCULTAR FILTROS</h3>
                            </>
                        ) 
                    : 
                        (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                                <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"/>
                            </svg>
                            <h3>MOSTRAR FILTROS</h3>
                            </>
                        ) 
                    }
                </div>
            </div>
            {show && (
                <div className={`cont-filtros ${show ? 'show' : ''}`}>
                    {children}
                </div>
            )}
        </div>
    );

}

export default WrapperFiltros;