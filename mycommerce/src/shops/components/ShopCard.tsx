import { Shop } from '../interfaces/Shop';

export const ShopCard = ({ RIF, imagen, nombre, descripcion }: Shop) => {
	const url = new URL(
		'http://127.0.0.1/e-commerce-tarea/frontend/vistas/tienda.html'
	);
	url.searchParams.set('RIF', RIF.toString());
	return (
		<a href={url.toString()} className="producto">
			<img src={imagen} alt="" />
			<div className="informacion">
				<span className="tienda_nombre">{nombre}</span>
				<span className="descripcion">{descripcion}</span>
				<span className="ubicacion">Ir a ver</span>
			</div>
		</a>
	);
};
