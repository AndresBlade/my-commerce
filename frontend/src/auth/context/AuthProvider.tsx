import { UserData } from '../../user/interfaces/UserData';
import { AuthContext } from './AuthContext';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserData>({
		clientData: { id: -1, imagen: '', nombre: '' },
		token: '',
		userData: { correo: '', createdAt: '', tipoId: -1 },
	});
	const previousDataString: string | null = localStorage.getItem('userData');
	let previousData: UserData;
	if (previousDataString !== null && user.token === '') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		previousData = JSON.parse(previousDataString);
		setUser(previousData);
	}
	return (
		<AuthContext.Provider value={{ ...user, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
