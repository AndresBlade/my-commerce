import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const LoginPage = () => {
	return (
		<div
			className="background-degradado"
			style={{ height: (100).toString() + 'vh', padding: `${50}px` }}
		>
			<div className="box-body">
				<div className="wrapper" style={{ margin: `${0} auto` }}>
					<h1>Inicia Sesión</h1>
					<form action="../index.html" className="userForm">
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
					</form>
					<button type="submit" className="btn-login">
						Inicia Sesión
					</button>
					<div className="member">
						¿Aun no te has registrado?
						<a href="../vistas/signup.html">Regístrate aqui</a>
					</div>
				</div>
			</div>
		</div>
	);
};
