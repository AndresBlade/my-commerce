/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, ChangeEvent, useState, useRef, useEffect } from 'react';
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
import { updateUserPassword } from '../helpers/updateUserPassword';
import { updateUserEmail } from '../helpers/updateUserEmail';
import { UserData } from '../interfaces/UserData';
import { updateUserName } from '../helpers/updateUserName';
import {
	NavigateFunction,
	Params,
	redirect,
	useNavigate,
	useParams,
} from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { deactivateUser } from '../helpers/deactivateUser';
const fadeMessage = keyframes`
0% {
	opacity: 0
}
20%{
	opacity: 1
}

80% {
	opacity: 1
}
100% {
 opacity: 0
}`;

const ModalInfoParagraph = styled.p`
	width: 400px;
	padding: 0 40px;
	background-color: #f4d0a0;
	line-height: 2;
`;

const UpdateUserDataInfoStyled = styled.p.attrs<{
	$status: 'success' | 'failure';
}>(props => ({
	$status: props.$status,
}))`
	background-color: ${props =>
		props.$status === 'success' ? '#80d0a0' : '#f07070'};
	border-radius: 10px;
	font-size: 8px;
	color: #ffffff;
	font-weight: 700;
	padding: 20px;
	animation-name: ${fadeMessage};
	animation-fill-mode: forwards;
	animation-duration: 3s;
`;

export const ProfileButtonStyled = styled.button`
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

export const DeleteButtonStyled = styled(ProfileButtonStyled)`
	background-color: #c04040;
`;

const ProfileButtonContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 2rem;
	gap: 1rem;
`;

const DecisionButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1rem;
	padding-bottom: 10px;
`;

const DecisionButton = styled.button`
	width: 100px;
	text-align: center;
	padding: 15px 20px;
	border-radius: 3px;
	color: #fff;
	cursor: pointer;
`;

const YesButton = styled(DecisionButton)`
	background-color: #c04040;
`;

const NoButton = styled(DecisionButton)`
	background-color: var(--letrasAzules-color);
`;

const TriggerParagraph = styled.p`
	cursor: pointer;
`;

const PopUpEditIcon = styled.i.attrs<{
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
	deactivate,
}

type SubmitFormType<Type> = Type extends FormType.email
	? { email: string }
	: Type extends FormType.username
	? { username: string }
	: Type extends FormType.password
	? { oldPassword: string; newPassword: string }
	: null;

function onSubmit(
	form: Form,
	type: FormType | null,
	token: string,
	setUserUpdateDataInfo: React.Dispatch<
		React.SetStateAction<{
			value: string;
			status: 'success' | 'failure';
		} | null>
	>,
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	setUser: React.Dispatch<React.SetStateAction<UserData>>,
	navigate: NavigateFunction
) {
	console.log('en el submit');
	switch (type) {
		case FormType.password: {
			console.log({
				token,
				obj: {
					oldPassword: form.oldPassword,
					newPassword: form.newPassword,
				},
			});

			if (form.oldPassword === form.newPassword) {
				setShowModal(false);
				setUserUpdateDataInfo({
					status: 'failure',
					value: 'Las contraseñas no pueden ser iguales',
				});
				return;
			}

			updateUserPassword(token, {
				oldPassword: form.oldPassword,
				newPassword: form.newPassword,
			})
				.then(response => {
					if (response === 'PASSWORD_NOT_MATCH') {
						setShowModal(false);
						return setUserUpdateDataInfo({
							value: 'La contraseña del usuario es incorrecta',
							status: 'failure',
						});
					}
					setUserUpdateDataInfo({
						value: 'Contraseña cambiada correctamente',
						status: 'success',
					});
					setShowModal(false);
				})
				.catch(error => console.log(error));
			break;
		}

		case FormType.email: {
			console.log({ token, email: form.email });
			updateUserEmail(token, { newUserEmail: form.email })
				.then(response => {
					console.log(response);
					setShowModal(false);
					setUser(user => {
						user.userData.correo = response.userUpdated.newEmail;
						localStorage.setItem('userData', JSON.stringify(user));
						return user;
					});
					return setUserUpdateDataInfo({
						status: 'success',
						value: `El correo fue cambiado correctamente a ${response.userUpdated.newEmail}`,
					});
				})
				.catch((err: Error) => {
					console.log(err.message);
					if (err.message === 'EMAIL_ALREADY_USED') {
						setShowModal(false);

						return setUserUpdateDataInfo({
							status: 'failure',
							value: 'El correo ya está en uso por usted mismo u otro usuario',
						});
					}
				});
			break;
		}

		case FormType.username: {
			console.log({ token, username: form.username });
			updateUserName(token, { newUserName: form.username })
				.then(response => {
					console.log(response);
					setShowModal(false);
					setUser(user => {
						user.clientData = response.clientUpdated;
						localStorage.setItem('userData', JSON.stringify(user));
						navigate(`/${response.clientUpdated.nombre}`, {
							replace: true,
						});
						return user;
					});
					return setUserUpdateDataInfo({
						status: 'success',
						value: 'Nombre de usuario cambiado correctamente',
					});
				})
				.catch((err: Error) => {
					console.log(err.message);
					if (err.message === 'NAME_ALREADY_USED') {
						setShowModal(false);
						return setUserUpdateDataInfo({
							status: 'failure',
							value: 'El nombre de usuario ya está en uso por usted u otro usuario',
						});
					}
				});
			break;
		}
	}
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

	const navigate = useNavigate();

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

	const updateUserDataRef = useRef<HTMLParagraphElement>(null);

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [editButton, setEditButton] = useState<{
		element: HTMLElement;
		mouseleave: boolean;
	} | null>(null);
	const [updateUserDataInfo, setUpdateUserDataInfo] = useState<{
		value: string;
		status: 'success' | 'failure';
	} | null>(null);
	const [formType, setFormType] = useState<FormType | null>(null);
	const {
		email,
		username,
		newPassword,
		oldPassword,
		formState,
		onInputChange,
	} = useForm<Form>({
		email: correo,
		username: nombre,
		newPassword: '',
		oldPassword: '',
	});
	const timeoutId = useRef<number | null>(null);

	useEffect(() => {
		if (updateUserDataRef.current) {
			setTimeout(() => {
				setUpdateUserDataInfo(null);
			}, 3000);
		}
	}, [updateUserDataInfo]);

	return (
		<>
			{editButton?.element && (
				<PopUpEditIcon
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
				></PopUpEditIcon>
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
								<DeleteButtonStyled
									onClick={() => {
										setShowModal(true);
										setFormType(FormType.deactivate);
									}}
								>
									Desactivar Cuenta
								</DeleteButtonStyled>
							</ProfileButtonContainerStyled>
							{updateUserDataInfo !== null ? (
								<UpdateUserDataInfoStyled
									ref={updateUserDataRef}
									$status={updateUserDataInfo.status}
								>
									{updateUserDataInfo.value}
								</UpdateUserDataInfoStyled>
							) : (
								<></>
							)}
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
						) : formType === FormType.deactivate ? (
							<>
								<ModalInfoParagraph>
									Estás seguro de querer desactivar tu cuenta?
									ya no podrás acceder a ella con tu correo ni
									contraseña, ni podrás registrar una nueva
									cuenta en la página con dichos datos
								</ModalInfoParagraph>
							</>
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
				{formType === FormType.deactivate ? (
					<DecisionButtonsContainer>
						<YesButton
							onClick={() => {
								deactivateUser(token)
									.then(response => {
										if (
											response ===
											'USER_DESACTIVATED_SUCCESSFULLY'
										) {
											localStorage.clear();
											setUser({
												clientData: {
													id: -1,
													imagen: '',
													nombre: '',
												},
												token: '',
												userData: {
													correo: '',
													createdAt: '',
													tipoId: -1,
												},
											});
											navigate('/');
										}
									})
									.catch(err => console.log(err));
							}}
						>
							Aceptar
						</YesButton>
						<NoButton onClick={() => setShowModal(false)}>
							Cancelar
						</NoButton>
					</DecisionButtonsContainer>
				) : (
					<ModalFormSubmitButton
						title="Subir cambios"
						handleClick={() =>
							onSubmit(
								formState,
								formType,
								token,
								setUpdateUserDataInfo,
								setShowModal,
								setUser,
								navigate
							)
						}
					/>
				)}
			</Modal>
		</>
	);
};
