import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import defaultUserImage from '../../assets/default_user_image.png';
import { UserData } from '../../user/interfaces/UserData';
import { Btn_menu } from './Btn_Menu';
import { MenuContext } from '../context/MenuContext';

export const Nav = () => {
	const { showMenu, setShowMenu } = useContext(MenuContext)
		const { 
			userData: {
				token,
				user: { nombre, imagen },
			},
		} = useContext(AuthContext);

	  const bg_dark =  showMenu 
	? 'bg-modal'
	: 'bg-modal hidden';

	const menu =  showMenu 
	? "absolute top-0 -right-[312px] w-[312px] duration-300 transition-all rounded-s-lg"
	: "absolute top-0 hidden duration-300 transition-all";
	
	const MenuClick = () => 
	{	
		setShowMenu(!showMenu);
	}

	return (
		<div className='flex gap-8 items-center'>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="explorar">Explorar</Link>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="ayuda">Ayuda</Link>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="contactanos">Contactanos</Link>			

			{token ? <LogoutButton /> : <LoginButton />}
			
			<Link className={`${token ? 'hidden lg:flex cursor-pointer w-14 h-14 bg-gris rounded-full' : 'hidden'}`} to={nombre}>
				<img className='w-full object-cover rounded-full' src={imagen || defaultUserImage} alt=""/>
			</Link>

			{/* Menu lateral responsive */}

			<div className='block cursor-pointer lg:hidden' onClick={MenuClick}>
				<ion-icon name="menu" size='large'></ion-icon>
			</div>

			<div className={bg_dark} onClick={MenuClick}></div>

			<ul className={menu}>
				<span className='flex justify-center items-center ml-auto mt-2 mr-3 w-[2.5rem] h-[2.5rem] text-[2rem] font-normal text-gray-400 cursor-pointer rounded-lg hover:bg-gray-200' onClick={MenuClick}>×</span>
				<Link to={nombre} onClick={MenuClick} className='flex mx-auto w-[95%] rounded-2xl hover:bg-gris'>
					<div className='flex mx-4 my-2 items-center gap-8 overflow-hidden'>
						<img src={imagen || defaultUserImage} className='w-24 h-24 rounded-full' alt="" />
						<span className='text-[1rem] font-medium uppercase'>hola, {nombre || 'Usuario'}</span>
					</div>
				</Link>

				<div className='w-full flex flex-col gap-4'>
					{ !token ? <Btn_menu nombre='Iniciar Sesión' url='Login' onClick={MenuClick}/> : <Btn_menu nombre='Cerrar Sesión' url='' onClick={MenuClick}/> }
					{ !token ? <Btn_menu nombre='Registrar' url='register' onClick={MenuClick}/> : ''}
					<Btn_menu nombre='Explorar' url='Explorar' onClick={MenuClick}/>
					<Btn_menu nombre='Ayuda' url='Ayuda' onClick={MenuClick}/>
					<Btn_menu nombre='Contactanos' url='Contactanos' onClick={MenuClick}/>
				</div>
			</ul>
		</div>
	);
};
