import { useLoaderData } from 'react-router';
import { ShopLoader } from '../interfaces/ShopLoader';

export const ShopProfile = () => {
	const { shopData } = useLoaderData() as ShopLoader;
	const { datosTienda } = shopData;
	return (
		<aside className="menu-dashboard">
			<div className="sidebar-content">
				<div className="menu-logo">
					<img
						className="tienda_logo"
						alt="Tienda-logo"
						src={datosTienda[0].imagen}
					/>
					<h1 className="tienda_nombre">{datosTienda[0].nombre}</h1>
				</div>
				<p className="tienda_descripcion">
					{datosTienda[0].descripcion}
				</p>
				<ul>
					<h2 className="about">Acerca de {datosTienda[0].nombre}</h2>
					<li className="RIF">{datosTienda[0].RIF}</li>
					<li className="createdAt">
						Creada: {datosTienda[0].createdAt.split('T')[0]}
					</li>
					<li>Ubicación: Lara</li>
				</ul>
			</div>
		</aside>
	);
};
