import { ElementRef, ReactNode } from 'react';
import { ErrorMessage } from '../../ui/components/ErrorMessage';

type Props = {
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	error: string | null;
	formRef?: React.RefObject<ElementRef<'form'>>;
	children: ReactNode;
};

export const ModalForm = ({ error, setError, formRef, children }: Props) => {
	return (
		<form
			action=""
			className="modal__formModal formModal"
			encType="multipart/form-data"
			ref={formRef}
		>
			{children}
			<div className="formModal__errorBox">
				{error && <ErrorMessage setError={setError} message={error} />}
			</div>
		</form>
	);
};
