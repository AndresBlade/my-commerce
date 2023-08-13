type Props = {
	handleClick: () => void;
	title: string;
};

export const ModalFormSubmitButton = ({ handleClick, title }: Props) => {
	return (
		<button
			type="button"
			className="formModal__submit"
			onClick={() => {
				handleClick();
			}}
		>
			{title}
		</button>
	);
};
