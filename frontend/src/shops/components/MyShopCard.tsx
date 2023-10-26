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
	margin-bottom: 1rem;
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
				className="p-5 overflow-hidden flex flex-col bg-blanco shadow-md hover:scale-95 hover:shadow-lg"
				ref={containerRef}
			>
				<div className='flex flex-col items-center md:flex-row'>
					<img src={imagen} alt={nombre} className="w-24 h-24 object-cover rounded-full md:w-24 md:h-24" />
					<div className='flex flex-col text-center gap-3 p-4 md:text-left'>
						<h3 className="font-semibold text-[1.1rem] md:text-[1.5rem]">{nombre}</h3>
						<p className="text-title-shops">{descripcion}</p>

						<p className="text-title-shops">
							<span>RIF-</span>
							{RIF}
						</p>
						<p>
							<span className="text-title-shops">
								Fecha de Creación:
							</span>
							{` ${createdAt.split('T')[0]}`}
						</p>
					</div>
				</div>

				<EditButtonStyled
					onClick={e => {
						e.preventDefault();
						setShowModal(true);
						setEditShop(true);
						console.log(shop);
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
