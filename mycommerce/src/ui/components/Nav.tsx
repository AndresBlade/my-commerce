import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { UserData } from '../../user/interfaces/UserData';

export const Nav = () => {
	const {
		userData: {
			token,
			user: { nombre },
		},
	} = useContext(AuthContext);

	return (
		<div className="group">
			<ul className="navigation">
				<li>
					<Link to="explorar">Explorar</Link>
				</li>
				<li>
					<Link to="ayuda">Ayuda</Link>
				</li>
				<li className={`btn_perfil ${token ? 'btn_perfil--show' : ''}`}>
					<Link to={nombre}>Mi Perfil</Link>
				</li>
				<li>
					<Link to="contactanos">Contactanos</Link>
				</li>
				{token ? <LogoutButton /> : <LoginButton />}
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
