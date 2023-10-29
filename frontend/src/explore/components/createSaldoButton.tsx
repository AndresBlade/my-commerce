import { Link } from 'react-router-dom';

type Props = {
	saldoValue: string;
};

export const SaldoButton = ({ saldoValue }: Props) => {
	return (
		<button
			type="button"
			className="bg-green-400 transition-all font-semibold inline-block text-center text-md w-64 z-10 p-3 rounded-full text-green-900 shadow-xl fixed bottom-10 right-5"
		>
			{saldoValue}
		</button>
	);
};
