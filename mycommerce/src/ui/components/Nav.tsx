import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import User from '../../assets/default_user_image.png';
import { UserData } from '../../user/interfaces/UserData';

export const Nav = () => {
	const {
		userData: {
			token,
			user: { nombre },
		},
	} = useContext(AuthContext);

	return (
		<div className='flex gap-8 items-center'>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="explorar">Explorar</Link>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="ayuda">Ayuda</Link>
			<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="contactanos">Contactanos</Link>				
			<Link className={`${token ? 'hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' : 'hidden'}`} to={nombre}>Mi Perfil</Link>
			{token ? <LogoutButton /> : <LoginButton />}
		</div>
	);
};
