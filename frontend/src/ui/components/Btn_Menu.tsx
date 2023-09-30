import React from 'react';
import { Link } from 'react-router-dom';

interface Btn_menuProps {
  url: string;
  nombre: string;
  onClick: () => void;
}

export const Btn_menu = ({ url, nombre, onClick }: Btn_menuProps) => {
  return (
    <Link to={url} onClick={onClick}>
      <div className= 'my-0 mx-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-gris'>
        <p className= 'text-[.9rem] font-medium uppercase text-black'>{nombre}</p>
      </div>
      <div className='mx-auto mt-2 w-[90%] min-h-[2.5px] bg-gris'></div>
    </Link>
  );
};
