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

export const MyShopCard = ({
	RIF,
	descripcion,
	createdAt,
	imagen,
	nombre,
}: Shop) => {
	const [showModal, setShowModal] = useState(false);

	const containerRef = useRef<ElementRef<'a'>>(null);

	const {
		user: { token },
	} = useContext(AuthContext);

	return (
		<>
			<Link
				to={RIF.toString()}
				ref={containerRef}
				className="misTiendas__tienda"
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
				<DeleteButtonStyled
					onClick={e => {
						e.preventDefault();
						setShowModal(true);
					}}
				>
					Borrar Tienda
				</DeleteButtonStyled>
			</Link>

			<Modal showModal={showModal} setShowModal={setShowModal}>
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
								setShowModal(false);
							}}
						>
							Aceptar
						</YesButton>
						<NoButton onClick={() => setShowModal(false)}>
							Cancelar
						</NoButton>
					</DecisionButtonsContainer>
				</ModalContent>
			</Modal>
		</>
	);
};
