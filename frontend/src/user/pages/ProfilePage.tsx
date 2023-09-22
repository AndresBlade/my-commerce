/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, ChangeEvent, useState, useRef } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import defaultUserImage from '../../assets/default_user_image.png';
import { setUserProfilePicture } from '../helpers/setUserProfilePicture';
import { Modal } from '../../ui/components/Modal';
import { ModalContent } from '../../ui/components/ModalContent';
import { ModalFormSubmitButton } from '../../ui/components/ModalFormSubmitButton';
import { ModalFormDivider } from '../../ui/components/ModalFormDivider';
import { ModalForm } from '../../ui/components/ModalForm';
import { keyframes, styled } from 'styled-components';
import { useForm } from '../../hooks/useForm';

const ProfileButtonStyled = styled.button`
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
const ProfileButtonContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 2rem;
	gap: 1rem;
`;

const TriggerParagraph = styled.p`
	cursor: pointer;
`;

const EditButtonStyled = styled.i.attrs<{
	$left: number;
	$top: number;
	$mouseleave: boolean;
}>(props => ({
	$left: props.$left,
	$top: props.$top,
	$mouseleave: props.$mouseleave,
}))`
	position: fixed;
	display: inline-block;
	font-size: 25px;
	height: 25px;
	margin: 0 auto;
	transition: none;
	animation: ${props => (props.$mouseleave ? fadeout : fadein)} 0.2s linear
		forwards;
	left: ${props => props.$left}px;
	top: ${props => props.$top}px;
	color: transparent;
`;

const fadein = keyframes`
0% {
	color: transparent
}
	100% {
		color: #888
	}
`;

const fadeout = keyframes`
0% {
	color: #888
}
	100% {
		color: transparent
	}
`;

interface Form {
	username: string;
	email: string;
	oldPassword: string;
	newPassword: string;
}

enum FormType {
	email,
	username,
	password,
}

export const ProfilePage = () => {
	const {
		user: {
			clientData: { imagen, nombre },
			userData: { correo },
			token,
		},
		user,
		setUser,
	} = useContext(AuthContext);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0] !== undefined)
			setUserProfilePicture(e.target.files?.[0], token)
				.then(response => {
					setUser({
						...user,
						clientData: {
							...user.clientData,
							imagen: response.nuevaImagen,
						},
					});
					localStorage.setItem(
						'userData',
						JSON.stringify({
							...user,
							clientData: {
								...user.clientData,
								imagen: response.nuevaImagen,
							},
						})
					);
				})
				.catch(err => console.log(err));
	};

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editButton, setEditButton] = useState<{
		element: HTMLElement;
		mouseleave: boolean;
	} | null>(null);
	const [formType, setFormType] = useState<FormType | null>(null);
	const { email, username, newPassword, oldPassword, onInputChange } =
		useForm<Form>({
			email: correo,
			username: nombre,
			newPassword: '',
			oldPassword: '',
		});
	const timeoutId = useRef<number | null>(null);

	return (
		<>
			{editButton?.element && (
				<EditButtonStyled
					$left={
						editButton.element.getBoundingClientRect().right -
						editButton.element.getBoundingClientRect().width / 3
					}
					$top={editButton.element.getBoundingClientRect().top}
					className="fa-solid fa-pen-to-square"
					onMouseEnter={() => {
						if (typeof timeoutId.current === 'number')
							clearTimeout(timeoutId.current);
						setEditButton(prev => prev);
					}}
					onMouseLeave={e => {
						if (typeof timeoutId.current === 'number')
							clearTimeout(timeoutId.current);
						setEditButton({
							element: e.currentTarget,
							mouseleave: true,
						});
						timeoutId.current = setTimeout(() => {
							setEditButton(null);
						}, 200);
					}}
					$mouseleave={editButton.mouseleave}
				></EditButtonStyled>
			)}
			<section className="tiendas-miPerfil">
				<div className="box-container-miPerfil">
					<div className="box-miPerfil">
						<div className="inner-container-miPerfil arriba">
							<label className="labelImg" htmlFor="input-file">
								<img
									src={imagen || defaultUserImage}
									id="profile-pic"
									alt=""
									className="circular-miPerfil"
								/>
							</label>
							<input
								type="file"
								className="input-fileImg"
								accept="image/*"
								id="input-file"
								onChange={handleImageChange}
							/>
							<h1 className="heading heading--nombreTienda">
								<TriggerParagraph
									className="userProfile__name"
									onClick={() => {
										setFormType(FormType.username);
										setShowModal(true);
									}}
									onMouseEnter={e => {
										if (
											typeof timeoutId.current ===
											'number'
										)
											clearTimeout(timeoutId.current);
										setEditButton({
											element: e.currentTarget,
											mouseleave: false,
										});
									}}
									onMouseLeave={e => {
										if (
											typeof timeoutId.current ===
											'number'
										)
											clearTimeout(timeoutId.current);
										setEditButton({
											element: e.currentTarget,
											mouseleave: true,
										});
										timeoutId.current = setTimeout(() => {
											setEditButton(null);
										}, 200);
									}}
								>
									{nombre}
								</TriggerParagraph>
							</h1>
						</div>

						<div className="miPerfil__info">
							<TriggerParagraph
								onClick={() => {
									setFormType(FormType.email);
									setShowModal(true);
								}}
								className="userProfile__email"
								onMouseEnter={e => {
									if (typeof timeoutId.current === 'number')
										clearTimeout(timeoutId.current);
									if (e.currentTarget.parentElement)
										setEditButton({
											element:
												e.currentTarget.parentElement,
											mouseleave: false,
										});
								}}
								onMouseLeave={e => {
									if (typeof timeoutId.current === 'number')
										clearTimeout(timeoutId.current);
									if (e.currentTarget.parentElement)
										setEditButton({
											element:
												e.currentTarget.parentElement,
											mouseleave: true,
										});
									timeoutId.current = setTimeout(() => {
										setEditButton(null);
									}, 200);
								}}
							>
								{correo}
							</TriggerParagraph>
							<ProfileButtonContainerStyled>
								{/* <ProfileButtonStyled
									onClick={() => setShowModal(true)}
								>
									Editar Datos Personales
								</ProfileButtonStyled> */}
								<ProfileButtonStyled
									onClick={() => {
										setShowModal(true);
										setFormType(FormType.password);
									}}
								>
									Cambiar contraseña
								</ProfileButtonStyled>
							</ProfileButtonContainerStyled>
						</div>
					</div>
				</div>
			</section>
			<Modal setShowModal={setShowModal} showModal={showModal}>
				<ModalContent>
					<ModalForm error={error} setError={setError}>
						{formType === FormType.email ? (
							<ModalFormDivider
								element="input"
								type="email"
								htmlFor="email"
								handleChange={onInputChange}
								name="email"
								title="Nuevo correo electrónico"
								value={email}
							/>
						) : formType === FormType.username ? (
							<ModalFormDivider
								element="input"
								type="text"
								htmlFor="username"
								handleChange={onInputChange}
								name="username"
								title="Nuevo nombre de usuario"
								value={username}
							/>
						) : (
							<>
								<ModalFormDivider
									element="input"
									type="password"
									handleChange={onInputChange}
									htmlFor="oldPassword"
									value={oldPassword}
									name="oldPassword"
									title="Contraseña anterior"
								/>
								<ModalFormDivider
									element="input"
									type="password"
									handleChange={onInputChange}
									htmlFor="newPassword"
									value={newPassword}
									name="newPassword"
									title="Nueva contraseña"
								/>
							</>
						)}
					</ModalForm>
				</ModalContent>
				<ModalFormSubmitButton
					title="Subir cambios"
					handleClick={() => false}
				/>
			</Modal>
		</>
	);
};
