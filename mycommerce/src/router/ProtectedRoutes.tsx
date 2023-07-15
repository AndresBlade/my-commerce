import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

export const ProtectedRoutes = () => {
	const { nombre } = useContext(AuthContext);

	console.log(nombre);

	if (nombre !== 'madrid') {
		return <Navigate to={'/login'} />;
	}

	return <Outlet />;
};
