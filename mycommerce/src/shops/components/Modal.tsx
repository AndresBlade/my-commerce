import { ElementRef, useRef } from 'react';
import { ModalTitle } from './ModalTitle';
import { ModalContent } from './ModalContent';
import { EntryProps } from './ModalFormDivider';

type Props<FormType = null, DataType = null, UserDataType = null> = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	form?: {
		entries: EntryProps[];
		formState: FormType;
		onSubmit: SubmitType<FormType, DataType, UserDataType>;
		setData: React.Dispatch<React.SetStateAction<DataType | null>>;
		setError: React.Dispatch<React.SetStateAction<string | null>>;
		error: string | null;
		userData: UserDataType;
	};
	title: string;
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

export const Modal = <FormType, DataType, UserDataType>({
	showModal,
	setShowModal,
	form,
	title,
}: Props<FormType, DataType, UserDataType>) => {
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
				<ModalTitle title={title} />
				<ModalContent form={form} />
			</div>
		</div>
	);
};
