import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { ElementRef, useContext, useRef, useState } from 'react';
import { getUserData } from '../helpers/getUser';
import { AuthContext } from '../context/AuthContext';
import { UserData } from '../interfaces/UserData';

interface Props {
	register?: boolean;
}

interface Form {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
	termsAccepted?: boolean;
}

interface ErrorMessageProps {
	message: string;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ErrorMessage = ({ message, setError }: ErrorMessageProps) => {
	const errorRef = useRef<ElementRef<'p'>>(null); //Another way to work with useRef; Useful if you want to work with custom components

	setTimeout(() => {
		errorRef.current?.classList.add('mensajeError--fade');
	}, 4400);

	setTimeout(() => {
		setError(null);
	}, 5000);
	return (
		<p className="mensajeError" ref={errorRef}>
			{message}
		</p>
	);
};

const onSubmit = (
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	register: boolean | undefined,
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>,
	navigate: NavigateFunction
): void => {
	if (register) {
		return;
	}

	const inputsFilled = form.email !== '' && form.password !== '';

	if (!inputsFilled) return setError('Faltan campos por rellenar');

	getUserData({ correo: form.email, contrasenna: form.password })
		.then(dataReceived => {
			console.log('recibido');
			console.log(dataReceived);
			setUserData(dataReceived.data);
			navigate('/perfil');
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
	const { setUserData } = useContext(AuthContext);
	const navigate = useNavigate();
	return (
		<div
			className="background-degradado"
			style={{ height: (100).toString() + 'vh', padding: `${50}px` }}
		>
			<div className="box-body">
				<div className="wrapper" style={{ margin: `${0} auto` }}>
					<h1>{register ? 'Regístrate' : 'Inicia Sesión'}</h1>
					<form action="../index.html" className="userForm">
						{register && (
							<input
								type="text"
								className="userForm__name"
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
							className="userForm__email"
							name="email"
							placeholder="Correo"
							value={email}
							onChange={onInputChange}
							required
						/>
						<input
							type="password"
							name="password"
							className="userForm__password"
							placeholder="Contraseña"
							value={password}
							onChange={onInputChange}
							required
						/>
						{register && (
							<input
								type="password"
								name="confirmPassword"
								className="userForm__confirmPassword"
								placeholder="Confirmar Contraseña"
								value={confirmPassword}
								onChange={onInputChange}
								required
							/>
						)}
						{error && (
							<ErrorMessage message={error} setError={setError} />
						)}
					</form>
					<button
						type="submit"
						className="btn-login"
						onClick={() =>
							onSubmit(
								formState,
								setError,
								register,
								setUserData,
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

					<div className="member">
						{register ? (
							<>
								Ya esta Registrado?
								<Link to="/login"> Inicia Sesión aqui</Link>
							</>
						) : (
							<>
								¿Aun no te has registrado?
								<Link to="/register"> Regístrate aqui</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
