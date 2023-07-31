import { Btn_menu } from './Btn_Menu';
import { Link } from 'react-router-dom';
import User from '../../assets/default_user_image.png';

export const Header = () => {
	return (
		<header className='bg-bg-degradado top-0 sticky'>
			<div className='w-[95%] mx-auto'>
				<nav className='flex justify-between items-center'>
					<Link to="/" className='text-[1.5rem] mr-16 my-8 md:text-[2rem] text-white tracking-[0.2rem] font-medium'>
						MY<span className='text-amarillo font-semibold'>COMMERCE</span>
					</Link>

					<div className='flex gap-8 items-center'>
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="explorar">Explorar</Link>
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="ayuda">Ayuda</Link> 
						<Link className='hidden sm:flex text-blanco text-[1rem] font-medium link-hover-effect' to="contactanos">Contactanos</Link> 
						<div className='cursor-pointer w-10 h-10 bg-bg-gris rounded-full'>
							<img className='w-full h-full' src={User} alt=""/>
						</div>
					</div>

					<div className='bg-modal hidden'></div>

					<ul className="fixed top-0 right-0 w-[80%] sm:w-1/3 overflow bg-blanco rounded-md">
						<div className='flex justify-between items-center px-5 py-8 w-full'>
							<div className='flex items-center gap-4'>
								<img src={User} className='w-16 h-16' alt="" />
								<span className='text-[.9rem] font-semibold'>Usuario</span>
							</div>
							<span className='flex justify-center items-center w-[2.5rem] h-[2.5rem] text-[2rem] font-normal text-gray-400 cursor-pointer rounded-lg hover:bg-gray-200'>×</span>
						</div>

						<div className='flex flex-col gap-4'>
							<li> <Btn_menu nombre='Iniciar Sesión' url='Login' /> </li>
							<li> <Btn_menu nombre='Iniciar Sesión' url='Login' /> </li>
						</div>
					</ul>
				</nav>
			</div>
		</header>
	);
};
