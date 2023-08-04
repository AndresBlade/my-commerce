import { ElementRef, useRef } from 'react';
import { ModalTitle } from './ModalTitle';
import { ModalContent } from './ModalContent';
import { UserData } from '../../user/interfaces/UserData';
import { EntryProps } from './ModalFormDivider';

type Props<FormType = null, DataType = null> = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	form?: {
		entries: EntryProps[];
		formState: FormType;
		onSubmit: SubmitType<FormType, DataType>;
		setData: React.Dispatch<React.SetStateAction<DataType | null>>;
		setError: React.Dispatch<React.SetStateAction<string | null>>;
		error: string | null;
	};
};

function closeModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): void {
	return setShowModal(false);
}

export type SubmitType<FormType, DataType> = {
	(
		form: FormType,
		setError: React.Dispatch<React.SetStateAction<string | null>>,
		{
			user: { id },
			token,
		}: UserData,
		setData: React.Dispatch<React.SetStateAction<DataType | null>>
	): void;
};

export const Modal = <FormType, DataType>({
	showModal,
	setShowModal,
	form,
}: Props<FormType, DataType>) => {
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
				<ModalTitle title="Agregar Tienda" />
				<ModalContent form={form} />
			</div>
		</div>
	);
};
