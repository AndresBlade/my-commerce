import { UserData } from '../../user/interfaces/UserData';
import { AuthContext } from './AuthContext';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [userData, setUserData] = useState<UserData>({
		token: '',
		user: {
			correo: '',
			createdAt: new Date(),
			id: -1,
			nombre: '',
			tipo_id: -1,
			updatedAt: new Date(),
			imagen: '',
		},
	});
	const previousDataString: string | null = localStorage.getItem('userData');
	let previousData: UserData;
	if (previousDataString !== null && userData.token === '') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		previousData = JSON.parse(previousDataString);
		setUserData(previousData);
	}
	return (
		<AuthContext.Provider value={{ ...userData, userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
