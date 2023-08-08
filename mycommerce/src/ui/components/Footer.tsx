import React from 'react'
import { Link } from 'react-router-dom';


export const Footer = () => {
    return(
        <footer className='bg-bg-degradado flex items-center justify-around py-5 mt-10'>
            <Link to="/" className='flex text-[1.5rem] my-8 md:text-[2rem] md:mr-8 lg:text-[2.1rem]'>
                <span className='text-white tracking-[0.2rem] font-medium'>MY</span> <span className='text-amarillo font-semibold'>COMMERCE</span>
            </Link>   

            <div className="flex gap-3 md:gap-7">
                <Link to="#">
                    <ion-icon name="logo-facebook" size='large'></ion-icon>
                </Link>
                <Link to="#">
                    <ion-icon name="logo-twitter" size='large'></ion-icon>
                </Link>
                <Link to="#">
                    <ion-icon name="logo-instagram" size='large'></ion-icon>
                </Link>
                <Link to="#">
                    <ion-icon name="logo-whatsapp" size='large'></ion-icon>
                </Link>
            </div>    
        </footer>
	);
};
