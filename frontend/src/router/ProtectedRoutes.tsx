import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

export const ProtectedRoutes = () => {
	const { user } = useContext(AuthContext);
	const { username } = useParams() as { username: string };

	if (user === null) {
		return <Navigate to={'/login'} />;
	}

	console.log({ clientDataNombre: user.specificData.nombre, username });

	if (user.specificData.nombre !== username) {
		throw new Error(
			'Este contenido no se se encuentra disponible en este momento.'
		);
	}

	return <Outlet />;
};
