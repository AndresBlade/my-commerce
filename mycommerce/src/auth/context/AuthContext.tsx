import { createContext } from 'react';
import { UserData } from '../interfaces/UserData';

export type AuthContextProps = {
	userData: UserData | null;
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
};

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);
