type Props = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateShopButton = ({ setShowModal }: Props) => {
	return (
		<button
			type="button"
			className="btnAgregar"
			onClick={() => setShowModal(true)}
		>
			Agregar Tienda
		</button>
	);
};
