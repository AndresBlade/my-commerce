import { createContext } from 'react';

type SideBarProp = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBarContext = createContext({} as SideBarProp);
