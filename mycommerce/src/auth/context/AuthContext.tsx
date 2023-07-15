import { createContext } from 'react';

export type AuthContextProps = {
	nombre: string;
};

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);
