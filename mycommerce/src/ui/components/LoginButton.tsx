import { Link } from 'react-router-dom';

export const LoginButton = () => {
	return (
		<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="login">
			Iniciar Sesión
		</Link>
	);
};
