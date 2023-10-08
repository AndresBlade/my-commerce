import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { getUser } from '../../user/helpers/getUser';
import { AuthContext } from '../context/AuthContext';
import { UserData } from '../../user/interfaces/UserData';
import { createUser } from '../../user/helpers/createUser';
import { ErrorMessage } from '../../ui/components/ErrorMessage';

interface Props {
	register?: boolean;
}

interface Form {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	termsAccepted: boolean;
}

const onSubmit = (
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	register: boolean | undefined,
	setUserData: React.Dispatch<React.SetStateAction<UserData>>,
	navigate: NavigateFunction
): void => {
	let inputsFilled: boolean;
	if (register) {
		const emailRegex = /^\S+@\S+\.\S+$/;
		const { username, email, password } = form;
		inputsFilled = Object.values(form)
			.filter(inputValue => typeof inputValue === 'string')
			.every(inputValue => {
				return inputValue !== '';
			});

		if (!inputsFilled) return setError('Faltan campos por rellenar');

		if (!emailRegex.test(form.email))
			return setError('Ingrese un correo electrónico válido');

		if (form.password !== form.confirmPassword)
			return setError('Las contraseñas deben de coincidir');

		if (username.length < 8 || email.length < 8 || password.length < 8)
			return setError('Los campos deben de tener mínimo 8 caracteres');
		if (!form.termsAccepted)
			return setError(
				'Debe aceptar los términos y condiciones para poder registrarse'
			);

		createUser({
			nombre: username,
			correo: email,
			contrasenna: password,
		})
			.then(user => {
				console.log('registrado');
				console.log(user);
				setUserData(user);
				console.log(user.specificData?.nombre);
				navigate(`/${user.specificData.nombre}`);
				localStorage.setItem('userData', JSON.stringify(user));
			})
			.catch(err => console.log(err));

		return;
	}

	inputsFilled = form.email !== '' && form.password !== '';

	if (!inputsFilled) return setError('Faltan campos por rellenar');

	getUser({ correo: form.email, contrasenna: form.password })
		.then(user => {
			console.log(user);
			console.log('recibido');
			setUserData(user);
			console.log({
				client: user.specificData?.nombre,
				admin: user.specificData?.nombre,
			});
			navigate(`/${user.specificData.nombre}`);
			localStorage.setItem('userData', JSON.stringify(user));
		})
		.catch(err => {
			console.log(err);
			// if (
			// 	err.error === 'PASSWORD_NOT_MATCH' ||
			// 	err.error === 'USER_NOT_FOUND'
			// )
			//si el error es que la contraseña no coincide o el usuario no existe
			setError(
				err === 'Unauthorized'
					? 'El usuario o contraseña son incorrectos'
					: 'Ingrese un correo o contraseña reales (correo con @, contraseña con al menos una mayúscula)'
			);

			// if (err.erros.some(error => error.msg === 'Invalid value'))
			// 	return mostrarMensajeError(
			// 		'Ingrese un correo o contraseña reales (correo con @, contraseña con al menos una mayúscula)',
			// 		'.userForm'
			// 	); //si el error es que el correo o contraseña no es valido
		});
};

export const AuthPage = ({ register }: Props) => {
	const [error, setError] = useState<string | null>(null);
	// const initialForm: Form = ;
	const {
		formState,
		username,
		email,
		password,
		confirmPassword,
		termsAccepted,
		onInputChange,
		onCheckboxChange,
	} = useForm<Form>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		termsAccepted: false,
	});
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	return (
		<div
			className="bg-bg-degradado"
			style={{ height: (100).toString() + 'vh', padding: `${50}px` }}
		>
			<div
				className="w-80 py-8 px-4 my-12 mx-auto bg-blanco rounded-[10px] text-center shadow-2xl"
				style={{ margin: `${0} auto` }}
			>
				<h1 className="mb-4">
					{register ? 'Regístrate' : 'Inicia Sesión'}
				</h1>
				<form action="../index.html">
					{register && (
						<input
							type="text"
							className=""
							placeholder="Nombre"
							name="username"
							value={username}
							maxLength={45}
							required
							onChange={onInputChange}
						/>
					)}
					<input
						type="text"
						className=""
						name="email"
						placeholder="Correo"
						value={email}
						onChange={onInputChange}
						required
					/>
					<input
						type="password"
						name="password"
						className=""
						placeholder="Contraseña"
						value={password}
						onChange={onInputChange}
						required
					/>
					{register && (
						<input
							type="password"
							name="confirmPassword"
							className=""
							placeholder="Confirmar Contraseña"
							value={confirmPassword}
							onChange={onInputChange}
							required
						/>
					)}
					{error && (
						<ErrorMessage message={error} setError={setError} />
					)}
					<button
						type="button"
						className="flex m-4 px-12 py-3 text-blanco bg-dark-blue hover:opacity-80 cursor-pointer rounded-full mx-auto"
						onClick={() =>
							onSubmit(
								formState,
								setError,
								register,
								setUser,
								navigate
							)
						}
					>
						{register ? 'Regístrate' : 'Inicia Sesión'}
					</button>

					{register && (
						<div className="terms">
							<input
								type="checkbox"
								id="checkbox"
								className="termsCheckbox"
								name="termsAccepted"
								checked={termsAccepted}
								onChange={onCheckboxChange}
								required
							/>
							<label htmlFor="checkbox">
								<span> Acepto</span>
								<Link to="#"> Términos y Condiciones</Link>
							</label>
						</div>
					)}
				</form>
				<div className="text-[.8rem] mt-6">
					{register ? (
						<>
							¿Ya está registrado?
							<Link to="/login" className="text-dark-blue">
								{' '}
								Inicia sesión aquí
							</Link>
						</>
					) : (
						<>
							¿Aún no te has registrado?
							<Link to="/register" className="text-dark-blue">
								{' '}
								Regístrate aquí
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
