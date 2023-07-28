import { Link } from 'react-router-dom';

export const Nav = () => {
	return (
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
						class="searchBtn"
					></ion-icon>
					<ion-icon name="close-outline" class="closeBtn"></ion-icon>
				</span>
			</div>
			<ion-icon name="menu-outline" class="menuToggle"></ion-icon>
		</div>
	);
};
