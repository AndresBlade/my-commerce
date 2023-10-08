import { Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';

export const SpecificRoleRoutes = ({
	roleIsAdmin,
}: {
	roleIsAdmin: boolean;
}) => {
	const {
		user: {
			specificData: { admin },
		},
	} = useContext(AuthContext);

	console.log({ admin, roleIsAdmin });

	if (admin !== roleIsAdmin)
		throw new Error(
			'Este contenido no se se encuentra disponible en este momento.'
		);

	return <Outlet />;
};
