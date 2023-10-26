import { ReactNode, useState } from 'react';
import { SideBarContext } from './SideBarContext';

type Props = {
	children: ReactNode;
};

export const SideBarProvider = ({ children }: Props) => {
	const [open, setOpen] = useState(true);	

	return (
		<SideBarContext.Provider value={{ open, setOpen }}>
			{children}
		</SideBarContext.Provider>
	);
};
