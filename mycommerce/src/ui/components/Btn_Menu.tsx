import React from 'react';
import { Link } from 'react-router-dom';

interface Btn_menuProps {
  url: string;
  nombre: string;
}

export const Btn_menu = ({ url, nombre }: Btn_menuProps) => {
  return (
    <Link to={url}>
      <div className='w-full flex items-center'>
        <p className='text-[.9rem]'>{nombre}</p>
      </div>
    </Link>
  );
};
