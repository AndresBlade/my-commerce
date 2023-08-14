import { Link } from 'react-router-dom';

export const LoginButton = () => {
	return (
		<li>
			<Link className="btn_sesion" to="login">
				Iniciar Sesión
			</Link>
		</li>
	);
};
