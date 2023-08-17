import { createContext } from 'react';
import { UserData } from '../../user/interfaces/UserData';

export type AuthContextProps = {
	user: UserData;
	setUser: React.Dispatch<React.SetStateAction<UserData>>;
};

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);
