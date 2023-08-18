import { createContext } from 'react';

type MenuProp = {
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext({} as MenuProp);
