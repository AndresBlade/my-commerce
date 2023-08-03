import { Btn_menu } from './Btn_Menu';
import { Link } from 'react-router-dom';
import User from '../../assets/default_user_image.png';
import { useState, useEffect } from 'react';

export const Header = () => {

    const [isActive, setIsActive] = useState<boolean>()

	useEffect(() => {
		isActive
		  ? document.body.classList.add('overflow-hidden')
		  : document.body.classList.remove('overflow-hidden');
	  }, [isActive]);
	  
	
	const bg_dark =  isActive 
	? 'bg-modal'
	: 'bg-modal hidden';

	const menu =  isActive 
	? "fixed top-0 right-0 min-w-[100%] sm:min-w-[35%] bg-blanco duration-300 transition-all rounded-s-lg"
	: "fixed top-0 -right-[100%] duration-300 transition-all";
	
	const handleClick = () => 
	{	
		setIsActive(!isActive);
	}

	return (
		<header className='bg-bg-degradado top-0 sticky '>
			<div className='w-[95%] mx-auto'>
				<nav className='flex justify-between items-center'>
					<Link to="/" className='text-[1.5rem] mr-16 my-8 md:text-[2rem] text-white tracking-[0.2rem] font-medium'>
						MY<span className='text-amarillo font-semibold'>COMMERCE</span>
					</Link>

					<div className='flex gap-8 items-center'>
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="explorar">Explorar</Link>
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="ayuda">Ayuda</Link> 
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="contactanos">Contactanos</Link> 
						<div className='cursor-pointer w-10 h-10 bg-gris rounded-full' onClick={handleClick}>
							<img className='w-full h-full' src={User} alt=""/>
						</div>
					</div>

					<div className={bg_dark}  onClick={handleClick}></div>

					<ul className={menu}>
						<div className='flex justify-between items-center px-5 py-8 w-full'>
							<div className='flex items-center gap-4'>
								<img src={User} className='w-16 h-16' alt="" />
								<span className='text-[.9rem] font-semibold'>Usuario</span>
							</div>
							<span className='flex justify-center items-center w-[2.5rem] h-[2.5rem] text-[2rem] font-normal text-gray-400 cursor-pointer rounded-lg hover:bg-gray-200' onClick={handleClick}>×</span>
						</div>

						<div className='w-full flex flex-col gap-4'>
							<li onClick={handleClick}><Btn_menu nombre='Iniciar Sesión' url='Login'/></li>
							<li onClick={handleClick}><Btn_menu nombre='Registrar' url='Login'/></li>
							<li onClick={handleClick} className='block sm:hidden'><Btn_menu nombre='Explorar' url='Explorar'/></li>
							<li onClick={handleClick} className='block sm:hidden'><Btn_menu nombre='Ayuda' url='Ayuda'/></li>
							<li onClick={handleClick} className='block sm:hidden'><Btn_menu nombre='Contactanos' url='Contactanos'/></li>
						</div>
					</ul>
				</nav>
			</div>
		</header>
	);
};
