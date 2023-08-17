import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Product';

export const ProductCard = ({ imagenes, nombre, precio, id }: Product) => {
	return (
		<Link to={`/producto/${id}`} className="producto">
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)].ruta}
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
