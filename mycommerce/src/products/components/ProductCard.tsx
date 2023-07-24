import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Product';

export const ProductCard = ({
	imagenes: imagenesString,
	nombre,
	precio,
	id,
}: Product) => {
	// const url = new URL(
	// 	'http://127.0.0.1/e-commerce-tarea/frontend/vistas/producto.html'
	// );
	// url.searchParams.set('id', id.toString());

	const imagenes: string[] = imagenesString.split(' ');
	return (
		<Link to={`producto/${id}`} className="producto">
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)]}
				className="producto__imagen"
				alt={nombre}
			/>
			<div className="informacion">
				<span className="tipo-envio">Envío Gratis</span>
				<span className="precio">${precio}</span>
				<span className="precio-envio">Envío gratis</span>
				<span className="descripcion">${nombre}</span>
			</div>
		</Link>
	);
};
