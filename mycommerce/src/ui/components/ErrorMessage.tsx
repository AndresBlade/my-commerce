import { useRef, ElementRef } from 'react';
interface ErrorMessageProps {
	message: string;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ErrorMessage = ({ message, setError }: ErrorMessageProps) => {
	const errorRef = useRef<ElementRef<'p'>>(null); //Another way to work with useRef; Useful if you want to work with custom components

	setTimeout(() => {
		errorRef.current?.classList.add('mensajeError--fade');
	}, 4400);

	setTimeout(() => {
		setError(null);
	}, 5000);
	return (
		<p className="mensajeError" ref={errorRef}>
			{message}
		</p>
	);
};
