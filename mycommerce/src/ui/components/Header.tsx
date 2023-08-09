// import { Btn_menu } from './Btn_Menu';
import { Link } from 'react-router-dom';
// <<<<<<< HEAD
// import User from '../../assets/default_user_image.png';
// import { useState, useEffect} from 'react';

// export const Header = () => {

//     const [MenuIsActive, setMenuIsActive] = useState<boolean>()
//     const [SearchIsActive, setSearchIsActive] = useState<boolean>()

// 	useEffect(() => {
// 		MenuIsActive
// 		  ? (() => {
// 			  document.body.classList.add('-translate-x-[312px]');
// 			  document.body.classList.add('overflow-hidden');
// 			})()
// 		  : (() => {
// 			  document.body.classList.remove('-translate-x-[312px]');
// 			  document.body.classList.remove('overflow-hidden');
// 			})();
// 	  }, [MenuIsActive]);

// 	const bg_dark =  MenuIsActive
// 	? 'bg-modal'
// 	: 'bg-modal hidden';

// 	const menu =  MenuIsActive
// 	? "absolute top-0 -right-[312px] w-[312px] h-screen duration-300 transition-all rounded-s-lg"
// 	: "absolute top-0 hidden duration-300 transition-all";

// 	const searchBar =  SearchIsActive
// 	? 'relative w-[50px] h-[50px] bg-blanco rounded-full p-3 overflow-hidden duration-600'
// 	: 'relative w-[80%] h-[50px] bg-blanco rounded-full p-3 overflow-hidden duration-600';

// 	const searchBar_input =  SearchIsActive
// 	? 'relative hidden w-[50px] h-[50px] bg-blanco rounded-full p-3 overflow-hidden duration-600 pointer-events-none'
// 	: 'border-none outline-none w-[85%] bg-blanco h-full rounded-full pl-4 font-medium text-[.9rem] transition-opacity focus:ring-0 focus:border-none';

// 	const searchBar_btn =  SearchIsActive
// 	? 'w-[40px] h-[40px] bg-amarillo rounded-full absolute top-0 bottom-0 right-0 left-0 m-auto grid place-items-center cursor-pointer duration-600'
// 	: 'w-[40px] h-[40px] rotate-90 bg-amarillo rounded-full absolute top-0 bottom-0 right-2 m-auto grid place-items-center cursor-pointer duration-600';

// 	const MenuClick = () =>
// 	{
// 		setMenuIsActive(!MenuIsActive);
// 	}

// 	const SearchClick = () =>
// 	{
// 		setSearchIsActive(!SearchIsActive);
// 	}

// 	return (
// 		<header className='bg-bg-degradado top-0 sticky'>
// 			<div className='w-[95%] mx-auto'>
// 				<nav className='flex justify-between items-center'>
// 					<Link to="/" className='flex text-[2rem] ml-4 my-8 md:text-[1.5rem] md:mr-8 lg:text-[2.1rem]'>
// 						<span className='hidden text-white tracking-[0.2rem] font-medium md:block'>MY</span> <span className='hidden text-amarillo font-semibold md:block'>COMMERCE</span> <span className='text-blanco font-bold md:hidden'>M</span> <span className='text-amarillo font-bold md:hidden'>C</span>
// 					</Link>

// 					<div className='flex flex-col items-center w-full min-w-[70px]'>
// 						<form action="https://www.google.com/search" className={searchBar}>
// 							<input
// 							type="search"
// 							placeholder="Andres gei"
// 							name="MC"
// 							className={searchBar_input}/>

// 							<div className={searchBar_btn} onClick={SearchClick}>
// 								<ion-icon name="search" color='primary'></ion-icon>
// 							</div>
// 						</form>
// 					</div>

// 					<div className='flex gap-8 items-center'>
// 						<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="explorar">Explorar</Link>
// 						<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="ayuda">Ayuda</Link>
// 						<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="contactanos">Contactanos</Link>
// 						<div className='cursor-pointer w-10 h-10 bg-gris rounded-full' onClick={MenuClick}>
// 							<img className='w-full h-full' src={User} alt=""/>
// 						</div>
// 					</div>

// 					<div className={bg_dark} onClick={MenuClick}></div>

// 					<ul className={menu}>
// 						<div className='flex justify-between items-center px-5 py-8 w-full'>
// 							<div className='flex items-center gap-4'>
// 								<img src={User} className='w-16 h-16' alt="" />
// 								<span className='text-[.9rem] font-semibold'>Usuario</span>
// 							</div>
// 							<span className='flex justify-center items-center w-[2.5rem] h-[2.5rem] text-[2rem] font-normal text-gray-400 cursor-pointer rounded-lg hover:bg-gray-200' onClick={MenuClick}>×</span>
// 						</div>

// 						<div className='w-full flex flex-col gap-4'>
// 							<li onClick={MenuClick}><Btn_menu nombre='Iniciar Sesión' url='Login'/></li>
// 							<li onClick={MenuClick}><Btn_menu nombre='Registrar' url='Login'/></li>
// 							<li onClick={MenuClick} className='block lg:hidden'><Btn_menu nombre='Explorar' url='Explorar'/></li>
// 							<li onClick={MenuClick} className='block lg:hidden'><Btn_menu nombre='Ayuda' url='Ayuda'/></li>
// 							<li onClick={MenuClick} className='block lg:hidden'><Btn_menu nombre='Contactanos' url='Contactanos'/></li>
// 						</div>
// 					</ul>
// 				</nav>
// 			</div>
// =======
import { Nav } from './Nav';

interface Props {
	authPage: boolean;
}

export const Header = ({ authPage }: Props) => {
	return (
		<header
			className={authPage ? 'bg-bg-degradado top-0 sticky' : 'bg-bg-degradado flex sticky rounded-b-lg z-50 text-[.8rem] top-0 w-full h-20 justify-items-start items-center'}
			style={
				authPage ? undefined : { paddingLeft: `${3}rem`, marginLeft: 0 }
			}
		>
			<div className='w-[95%] mx-auto'>
				<nav className='flex justify-between items-center'>
				 	<Link to="/" className='flex text-[2rem] ml-4 my-8 md:text-[1.5rem] md:mr-8 lg:text-[2.1rem]'>
 						<span className='hidden text-white tracking-[0.2rem] font-medium md:block'>MY</span> <span className='hidden text-amarillo font-semibold md:block'>COMMERCE</span> <span className='text-blanco font-bold md:hidden'>M</span> <span className='text-amarillo font-bold md:hidden'>C</span>
 					</Link>

					{authPage && <Nav />}
				</nav>
			</div>
			{/* >>>>>>> main */}
		</header>
	);
};
