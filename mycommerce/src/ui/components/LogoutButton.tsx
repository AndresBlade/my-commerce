import { styled } from 'styled-components';
import { useContext } from 'react';
import { SesionModalContext } from '../context/SesionModalContext';

const HeaderButton = styled.button`
	position: sticky;
	text-decoration: none;
	background-color: transparent;
	font-family: 'Poppins', sans-serif;
	cursor: pointer;
	font-size: 1rem;
	color: #fff;

	&::before {
		content: '';
		position: absolute;
		bottom: -2px;
		background-color: #fff;
		transform: scaleX(0);
		transition: transform 0.5s ease-in-out;
		transform-origin: right;
		width: 100%;
		height: 2px;
	}
	&:hover::before {
		transform: scaleY(1);
		transform-origin: left;
	}
`;

//estilos de mrd que arrechos son

export const LogoutButton = () => {
	const { setShowModal } = useContext(SesionModalContext);
	return (
		<>
			<li>
				<HeaderButton onClick={() => setShowModal(true)}>
					Cerrar Sesión
				</HeaderButton>
			</li>
		</>
	);
};
