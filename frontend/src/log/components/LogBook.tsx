import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { logUserAction } from '../../user/helpers/logUserAction';
import { AuthContext } from '../../auth/context/AuthContext';

export const LogBook = () => {
	const location = useLocation();
	const {
		user: {
			specificData: { nombre, id },
		},
	} = useContext(AuthContext);

	console.log('el pepe ete sech');

	useEffect(() => {
		if (id !== -1)
			logUserAction(`Navegó hacia ${location.pathname}`, nombre, id)
				.then(response => console.log(response))
				.catch(err => console.log(err));
	}, [location, id, nombre]);

	return <Outlet />;
};
