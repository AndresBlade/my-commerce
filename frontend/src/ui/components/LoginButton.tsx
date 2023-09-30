import { Link } from 'react-router-dom';

export const LoginButton = () => {
	return (
	//<Link className='hidden lg:flex text-blanco text-[1rem] font-medium link-hover-effect' to="login">
		<Link className='hidden lg:flex text-dark-blue text-[.9rem] bg-gris font-semibold px-[10px] py-[5px] rounded-lg' to="login">
			Iniciar Sesión
		</Link>
	);
};
