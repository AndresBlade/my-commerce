import { ErrorMessage } from '../../ui/components/ErrorMessage';
import { EntryProps, ModalFormDivider } from './ModalFormDivider';

type Props = {
	formEntries: EntryProps[];
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	error: string | null;
};

export const ModalForm = ({ formEntries, error, setError }: Props) => {
	return (
		<form
			action=""
			className="modal__formModal formModal"
			encType="multipart/form-data"
		>
			{formEntries.map((entry, index) => (
				<ModalFormDivider {...entry} key={index} />
			))}
			<div className="formModal__errorBox">
				{error && <ErrorMessage setError={setError} message={error} />}
			</div>
		</form>
	);
};
