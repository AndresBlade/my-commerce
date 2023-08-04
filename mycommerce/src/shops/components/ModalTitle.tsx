type Props = {
	title: string;
};

export const ModalTitle = ({ title }: Props) => {
	return (
		<header className="modal__header">
			<h2 className="modal__title">{title}</h2>
		</header>
	);
};
