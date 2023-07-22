import { Shop } from '../interfaces/Shop';
import { Link } from 'react-router-dom';

export const ShopCard = ({ RIF, imagen, nombre, descripcion }: Shop) => {
	// const url = new URL('localhost:5173/tienda.html');
	// url.searchParams.set('RIF', RIF.toString());
	return (
		<Link to={`tienda/${RIF.toString()}`} className="producto">
			<img src={imagen} alt="" />
			<div className="informacion">
				<span className="tienda_nombre">{nombre}</span>
				<span className="descripcion">{descripcion}</span>
				<span className="ubicacion">Ir a ver</span>
			</div>
		</Link>
	);
};
