import { createContext } from 'react';

type SesionModalProps = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SesionModalContext = createContext({} as SesionModalProps);
