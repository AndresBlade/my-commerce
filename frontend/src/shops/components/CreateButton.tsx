type Props = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	buttonTitle: string;
};

export const CreateButton = ({ setShowModal, buttonTitle }: Props) => {
	return (
		<button
			type="button"
			className="btnAgregar"
			onClick={() => setShowModal(true)}
		>
			{buttonTitle}
		</button>
	);
};
