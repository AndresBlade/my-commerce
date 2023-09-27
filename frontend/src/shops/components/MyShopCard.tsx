import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shop } from '../interfaces/Shop';
import { DeleteButtonStyled } from '../../user/pages/ProfilePage';
import { Modal } from '../../ui/components/Modal';
import { ModalContent } from '../../ui/components/ModalContent';

export const MyShopCard = ({
	RIF,
	descripcion,
	createdAt,
	imagen,
	nombre,
}: Shop) => {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<Link to={RIF.toString()} className="misTiendas__tienda">
			<h3 className="misTiendas__nombre">{nombre}</h3>
			<p>
				<span className="misTiendas__title">RIF:</span>
				{RIF}
			</p>
			<img src={imagen} alt={nombre} className="misTiendas__img" />
			<p>
				<span className="misTiendas__title">Fecha de Creación:</span>
				{createdAt.split('T')[0]}
			</p>
			<p className="misTiendas__descripcion">
				<span className="misTiendas__title">Descripción:</span>
				{descripcion}
			</p>
			<DeleteButtonStyled onClick={handleOpenModal}>Borrar Tienda</DeleteButtonStyled>

			{showModal && <Modal onClose={handleCloseModal}>
				<ModalContent>
					<ModalInfoParagraph>
						Estás seguro de querer desactivar tu cuenta?
						ya no podrás acceder a ella con tu correo ni
						contraseña, ni podrás registrar una nueva
						cuenta en la página con dichos datos
					</ModalInfoParagraph>
					<DecisionButtonsContainer>
						<YesButton onClick={handleCloseModal}>Aceptar</YesButton>
						<NoButton onClick={handleCloseModal}>Cancelar</NoButton>
					</DecisionButtonsContainer>
				</ModalContent>
			</Modal>}

			</Link>

	);
};
