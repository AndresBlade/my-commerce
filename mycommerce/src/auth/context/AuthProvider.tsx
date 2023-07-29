import { UserData } from '../interfaces/UserData';
import { AuthContext } from './AuthContext';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [userData, setUserData] = useState<UserData | null>(null);
	return (
		<AuthContext.Provider value={{ ...userData, userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
