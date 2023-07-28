import { Link } from 'react-router-dom';

interface Props {
	register?: boolean;
}

export const AuthPage = ({ register }: Props) => {
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
								maxLength={45}
								required
							/>
						)}
						<input
							type="text"
							className="userForm__email"
							placeholder="Correo"
							required
						/>
						<input
							type="password"
							className="userForm__password"
							placeholder="Contraseña"
							required
						/>
						{register && (
							<input
								type="password"
								className="userForm__confirmPassword"
								placeholder="Confirmar Contraseña"
								required
							/>
						)}
					</form>
					<button type="submit" className="btn-login">
						{register ? 'Regístrate' : 'Inicia Sesión'}
					</button>

					{register && (
						<div className="terms">
							<input
								type="checkbox"
								id="checkbox"
								className="termsCheckbox"
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
