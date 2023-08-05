import { SubmitType } from './Modal';
import { ModalForm } from './ModalForm';
import { EntryProps } from './ModalFormDivider';
import { ElementRef } from 'react';

type Props<FormType, DataType, UserDataType> = {
	form?: {
		entries: EntryProps[];
		formState: FormType;
		onSubmit: SubmitType<FormType, DataType, UserDataType>;
		setError: React.Dispatch<React.SetStateAction<string | null>>;
		setData: React.Dispatch<React.SetStateAction<DataType | null>>;
		error: string | null;
		formRef?: React.RefObject<ElementRef<'form'>>;
		userData: UserDataType;
	};
};

export const ModalContent = <FormType, DataType, UserDataType>({
	form,
}: Props<FormType, DataType, UserDataType>) => {
	return (
		<section className="modal__content">
			{form && (
				<>
					<ModalForm
						formEntries={form.entries}
						error={form.error}
						setError={form.setError}
					/>
					<button
						type="button"
						className="formModal__submit"
						onClick={() => {
							const {
								formState,
								onSubmit,
								setError,
								setData,
								formRef,
								userData,
							} = form;
							onSubmit(
								formState,
								setError,
								userData,
								setData,
								formRef
							);
						}}
					>
						Crear Tienda
					</button>
				</>
			)}
		</section>
	);
};
