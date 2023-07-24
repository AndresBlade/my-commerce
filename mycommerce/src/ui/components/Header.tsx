import { Link } from 'react-router-dom';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
	namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: unknown;
		}
	}
}

export const Header = () => {
	return (
		<header className="header">
			<Link to="/" className="logo">
				LOGO
			</Link>

			<div className="group">
				<ul className="navigation">
					<li>
						<Link to="explorar">Explorar</Link>
					</li>
					<li>
						<Link to="ayuda">Ayuda</Link>
					</li>
					<li className="btn_perfil">
						<Link to="perfil">Mi Perfil</Link>
					</li>
					<li>
						<Link to="contactanos">Contactanos</Link>
					</li>
					<li>
						<Link className="btn_sesion" to="login">
							Iniciar Sesión
						</Link>
					</li>
				</ul>

				<div className="search">
					<span className="icon">
						<ion-icon
							name="search-outline"
							id="blanco"
							className="searchBtn"
						></ion-icon>
						<ion-icon
							name="close-outline"
							className="closeBtn"
						></ion-icon>
					</span>
				</div>
				<ion-icon name="menu-outline" className="menuToggle"></ion-icon>
			</div>
		</header>
	);
};
