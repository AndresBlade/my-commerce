import { useLoaderData } from 'react-router';
import { ShopLoader } from '../interfaces/ShopLoader';
import '../../css/tiendaView.css';

export const ShopProfile = () => {
	const { shopData } = useLoaderData() as ShopLoader;
	const { RIF, descripcion, imagen, nombre, createdAt } = shopData.data;
	return (
		<aside className="menu-dashboard">
			<div className="sidebar-content">
				<div className="menu-logo">
					<img
						className="tienda_logo"
						alt="Tienda-logo"
						src={imagen}
					/>
					<h1 className="tienda_nombre">{nombre}</h1>
				</div>
				<p className="tienda_descripcion">{descripcion}</p>
				<ul>
					<h2 className="about">Acerca de {nombre}</h2>
					<li className="RIF">{RIF}</li>
					<li className="createdAt">
						Creada: {createdAt.split('T')[0]}
					</li>
					<li>Ubicación: Lara</li>
				</ul>
			</div>
		</aside>
	);
};
