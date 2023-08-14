import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

export const ProtectedRoutes = () => {
	const { userData } = useContext(AuthContext);
	const { username } = useParams() as { username: string };

	if (userData === null) {
		return <Navigate to={'/login'} />;
	}

	if (userData.user.nombre !== username) {
		throw new Error(
			'Este contenido no se se encuentra disponible en este momento.'
		);
	}

	return <Outlet />;
};
