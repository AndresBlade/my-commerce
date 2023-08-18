import { ReactNode, useState, useEffect } from 'react';
import { MenuContext } from './MenuContext';

type Props = {
	children: ReactNode;
};

export const MenuProvider = ({ children }: Props) => {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		showMenu
		  ? (() => {
			  document.body.classList.add('-translate-x-[312px]');
			  document.body.classList.add('overflow-hidden');
			})()
		  : (() => {
			  document.body.classList.remove('-translate-x-[312px]');
			  document.body.classList.remove('overflow-hidden');
			})();
	  }, [showMenu]);
      
	return (
		<MenuContext.Provider value={{ showMenu, setShowMenu }}>
			{children}
		</MenuContext.Provider>
	);
};
