import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

export const ProtectedRoutes = () => {
	const { userData } = useContext(AuthContext);

	if (!userData) {
		return <Navigate to={'/login'} />;
	}

	return <Outlet />;
};
