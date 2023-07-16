import { AuthContext } from './AuthContext';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
	return (
		<AuthContext.Provider value={{ nombre: 'pelasbolas' }}>
			{children}
		</AuthContext.Provider>
	);
};
