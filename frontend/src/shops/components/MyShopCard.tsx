import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shop } from '../interfaces/Shop';
import {
	DecisionButtonsContainer,
	DeleteButtonStyled,
	ModalInfoParagraph,
	NoButton,
	YesButton,
} from '../../user/pages/ProfilePage';
import { Modal } from '../../ui/components/Modal';
import { ModalContent } from '../../ui/components/ModalContent';
import { deactivateShop } from '../helpers/desactivateShop';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { ElementRef } from 'react';
import styled from 'styled-components';
import { ShopForm } from '../../user/pages/MyShopsPage';
interface Props {
	shop: Shop;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setInitialState: React.Dispatch<React.SetStateAction<ShopForm>>;
	setEditShop: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditButtonStyled = styled.button`
	display: flex;
	justify-content: center;
	padding: 1rem 3rem;
	cursor: pointer;
	border-radius: 10rem;
	/* font-size: 20px; */
	font-size: 16px;
	font-weight: 600;
	color: var(--letrasBlancas-color);
	background-color: var(--letrasAzules-color);
	border-color: var(--letrasBlancas-color);
	text-decoration: none;
`;

export const MyShopCard = ({
	shop,
	setShowModal,
	setInitialState,
	setEditShop,
}: Props) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const containerRef = useRef<ElementRef<'a'>>(null);

	const {
		user: { token },
	} = useContext(AuthContext);

	const { RIF, descripcion, createdAt, imagen, nombre } = shop;
	return (
		<>
			<Link
				to={RIF.toString()}
				className="misTiendas__tienda"
				ref={containerRef}
			>
				<h3 className="misTiendas__nombre">{nombre}</h3>
				<p>
					<span className="misTiendas__title">RIF:</span>
					{RIF}
				</p>
				<img src={imagen} alt={nombre} className="misTiendas__img" />
				<p>
					<span className="misTiendas__title">
						Fecha de Creación:
					</span>
					{createdAt.split('T')[0]}
				</p>
				<p className="misTiendas__descripcion">
					<span className="misTiendas__title">Descripción:</span>
					{descripcion}
				</p>

				<EditButtonStyled
					onClick={e => {
						e.preventDefault();
						setShowModal(true);
						setEditShop(true);
						setInitialState({
							RIF: shop.RIF,
							descripcion: shop.descripcion,
							Image: null,
							name: shop.nombre,
							region: shop.regionesTienda[0].id.toString(),
						});
					}}
				>
					Editar Tienda
				</EditButtonStyled>
				<DeleteButtonStyled
					onClick={e => {
						e.preventDefault();
						setShowDeleteModal(true);
					}}
				>
					Borrar Tienda
				</DeleteButtonStyled>
			</Link>

			<Modal
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
			>
				<ModalContent>
					<ModalInfoParagraph>
						Estás seguro de querer desactivar tu cuenta? ya no
						podrás acceder a ella con tu correo ni contraseña, ni
						podrás registrar una nueva cuenta en la página con
						dichos datos
					</ModalInfoParagraph>
					<DecisionButtonsContainer>
						<YesButton
							onClick={() => {
								console.log(RIF);
								deactivateShop(token, RIF)
									.then(response => {
										console.log(response);
										containerRef.current?.remove();
									})
									.catch(err => console.log(err));
								setShowDeleteModal(false);
							}}
						>
							Aceptar
						</YesButton>
						<NoButton onClick={() => setShowDeleteModal(false)}>
							Cancelar
						</NoButton>
					</DecisionButtonsContainer>
				</ModalContent>
			</Modal>
		</>
	);
};
