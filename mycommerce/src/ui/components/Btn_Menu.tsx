import React from 'react';
import { Link } from 'react-router-dom';

interface Btn_menuProps {
  url: string;
  nombre: string;
}

export const Btn_menu = ({ url, nombre}: Btn_menuProps) => {
  return (
    <Link to={url}>
      <div className= 'my-0 mx-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-gris'>
        <p className= 'text-[.9rem] font-medium uppercase text-black'>{nombre}</p>
      </div>
      <div className='mx-auto mt-2 w-[90%] h-[2px] bg-gris'></div>
    </Link>
  );
};
