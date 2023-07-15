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
			<a href="index.html" className="logo">
				LOGO
			</a>

			<div className="group">
				<ul className="navigation">
					<li>
						<a href="vistas/explorar.html">Explorar</a>
					</li>
					<li>
						<a href="vistas/ayuda.html">Ayuda</a>
					</li>
					<li className="btn_perfil">
						<a href="vistas/perfil.html">Mi Perfil</a>
					</li>
					<li>
						<a href="vistas/contactanos.html">Contactanos</a>
					</li>
					<li>
						<a className="btn_sesion" href="vistas/login.html">
							Iniciar Sesión
						</a>
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
