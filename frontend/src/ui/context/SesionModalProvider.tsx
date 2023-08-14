import { ReactNode, useState } from 'react';
import { SesionModalContext } from './SesionModalContext';

type Props = {
	children: ReactNode;
};

export const SesionModalProvider = ({ children }: Props) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<SesionModalContext.Provider value={{ showModal, setShowModal }}>
			{children}
		</SesionModalContext.Provider>
	);
};
