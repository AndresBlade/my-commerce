import { Link } from 'react-router-dom';
import { Shop } from '../interfaces/Shop';
export const MyShopCard = ({
	RIF,
	descripcion,
	createdAt,
	imagen,
	nombre,
}: Shop) => {
	return (
		<Link to={RIF.toString()} className="misTiendas__tienda">
			<h3 className="misTiendas__nombre">{nombre}</h3>
			<p>
				<span className="misTiendas__title">RIF:</span>
				{RIF}
			</p>
			<img src={imagen} alt={nombre} className="misTiendas__img" />
			<p>
				<span className="misTiendas__title">Fecha de Creación:</span>
				{createdAt.split('T')[0]}
			</p>
			<p className="misTiendas__descripcion">
				<span className="misTiendas__title">Descripción:</span>
				{descripcion}
			</p>
		</Link>
	);
};
