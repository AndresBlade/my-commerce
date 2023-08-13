import { ElementRef, ReactNode, useRef } from 'react';

type Props = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

function closeModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void {
	return setShowModal(false);
}

export type SubmitType<FormType, DataType, UserDataType> = {
	(
		form: FormType,
		setError: React.Dispatch<React.SetStateAction<string | null>>,
		userData: UserDataType,
		setData: React.Dispatch<React.SetStateAction<DataType | null>>,
		formRef?: React.RefObject<ElementRef<'form'>>
	): void;
};

export const Modal = ({ showModal, setShowModal, children }: Props) => {
	const modalRef = useRef<ElementRef<'div'>>(null);

	return (
		<div
			className={`modal ${showModal ? 'modal--visible' : ''}`}
			id="modal"
			ref={modalRef}
		>
			<div
				className="modal__dialog"
				onMouseEnter={() =>
					modalRef.current?.removeEventListener('click', () =>
						closeModal(setShowModal)
					)
				}
				onMouseLeave={() =>
					modalRef.current?.addEventListener('click', () =>
						closeModal(setShowModal)
					)
				}
			>
				{children}
			</div>
		</div>
	);
};
