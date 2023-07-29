import { UserData } from '../interfaces/UserData';
import { AuthContext } from './AuthContext';
import { ReactNode, useState } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	const [userData, setUserData] = useState<UserData | null>(null);
	const previousData: string | null = localStorage.getItem('userData');
	if (userData === null && previousData !== null)
		setUserData(JSON.parse(previousData) as UserData);
	return (
		<AuthContext.Provider value={{ ...userData, userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
