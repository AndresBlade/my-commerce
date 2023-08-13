import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const ModalContent = ({ children }: Props) => {
	return <section className="modal__content">{children}</section>;
};
