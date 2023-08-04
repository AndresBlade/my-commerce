import { SubmitType } from './Modal';
import { ModalForm } from './ModalForm';
import { EntryProps } from './ModalFormDivider';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

type Props<FormType, DataType> = {
	form?: {
		entries: EntryProps[];
		formState: FormType;
		onSubmit: SubmitType<FormType, DataType>;
		setError: React.Dispatch<React.SetStateAction<string | null>>;
		setData: React.Dispatch<React.SetStateAction<DataType | null>>;
		error: string | null;
	};
};

export const ModalContent = <FormType, DataType>({
	form,
}: Props<FormType, DataType>) => {
	const { userData } = useContext(AuthContext);
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
							const { formState, onSubmit, setError, setData } =
								form;
							onSubmit(formState, setError, userData, setData);
						}}
					>
						Crear Tienda
					</button>
				</>
			)}
		</section>
	);
};
