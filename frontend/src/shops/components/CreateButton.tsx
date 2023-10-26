type Props = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	buttonTitle: string;
};

export const CreateButton = ({ setShowModal, buttonTitle }: Props) => {
	return (
		<button
			type="button"
			className="bg-dark-blue transition-all hover:scale-105 font-semibold inline-block text-center text-md w-64 z-10 p-3 rounded-full text-blanco shadow-xl fixed bottom-10 right-5"
			onClick={() => setShowModal(true)}
		>
			{buttonTitle}
		</button>
	);
};
