import CancelImg from '../../assets/cancel.png';
import { useContext } from 'react';
import { SesionModalContext } from '../context/SesionModalContext';
import { Outlet, useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { AuthContext } from '../../auth/context/AuthContext';

const ImportantModal = styled.section`
	z-index: 1000;
`;

const ModalButton = styled.button`
	cursor: pointer;
`;

export const SesionModal = () => {
	const { showModal, setShowModal } = useContext(SesionModalContext);
	const { setUserData } = useContext(AuthContext);
	console.log(showModal);
	const navigate = useNavigate();
	return (
		<>
			<ImportantModal
				className={`modalSesion__sesion ${
					showModal ? 'modalSesion__sesion--show' : ''
				}`}
			>
				<div className="modalSesion__sesion-container">
					<img src={CancelImg} className="modalSesion__sesion-img" />
					<h2 className="modalSesion__sesion-title">
						¿Desea salir de sesión?
					</h2>
					<div className="modalSesion__sesion-options">
						<ModalButton
							className="modalSesion__si"
							onClick={() => {
								navigate('/');
								setTimeout(() => {
									setUserData({
										token: '',
										user: {
											correo: '',
											createdAt: new Date(),
											id: -1,
											nombre: '',
											tipo_id: -1,
											updatedAt: new Date(),
											imagen: '',
										},
									});

									localStorage.removeItem('userData');
									setShowModal(false);
								}, 50);
							}}
						>
							Sí
						</ModalButton>
						<ModalButton
							className="modalSesion__no"
							onClick={() => setShowModal(false)}
						>
							No
						</ModalButton>
					</div>
				</div>
			</ImportantModal>
			<Outlet />
		</>
	);
};
