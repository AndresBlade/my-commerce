import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const LoginPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { nombre } = useContext(AuthContext);

	console.log(nombre);
	return (
		<>
			<h1>Estas en el login webon</h1>
		</>
	);
};
