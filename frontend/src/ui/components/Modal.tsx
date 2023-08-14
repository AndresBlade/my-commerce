import { ElementRef, ReactNode, useCallback, useRef } from 'react';

type Props = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

export type SubmitType<FormType, DataType, UserDataType> = {
	(
		form: FormType,
		setError: React.Dispatch<React.SetStateAction<string | null>>,
		userData: UserDataType,
		setData: React.Dispatch<React.SetStateAction<DataType | null>>,
		setShowModal?: React.Dispatch<React.SetStateAction<boolean>>,
		formRef?: React.RefObject<ElementRef<'form'>>
	): void;
};

export const Modal = ({ showModal, setShowModal, children }: Props) => {
	const modalRef = useRef<ElementRef<'div'>>(null);
	console.log('rerender');

	const closeModal = useCallback(() => {
		console.log('cerrar');
		setShowModal(false);
	}, [setShowModal]);

	return (
		<div
			className={`modal ${showModal ? 'modal--visible' : ''}`}
			id="modal"
			ref={modalRef}
		>
			<div
				className="modal__dialog"
				onMouseEnter={() =>
					modalRef.current?.removeEventListener('click', closeModal)
				}
				onMouseLeave={() =>
					modalRef.current?.addEventListener('click', closeModal)
				}
			>
				{children}
			</div>
		</div>
	);
};
