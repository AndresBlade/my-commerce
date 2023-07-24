import { useId } from 'react';
import { SingleProduct } from '../interfaces/SingleProduct';
import { Link } from 'react-router-dom';
// import '../../css/productView.css';
export const ProductDetails = ({
	tienda,
	nombre,
	descripcion,
	precio,
}: SingleProduct) => {
	return (
		<article className="details">
			<div className="container_tienda">
				<img
					src={tienda.imagen}
					className="img_tienda"
					alt={tienda.nombre}
				/>
				<Link to={`/tienda/${tienda.RIF}`} className="tiendaName">
					{tienda.nombre}
				</Link>
			</div>
			<h2 className="productName">{nombre}</h2>
			<p className="descripcion">{descripcion}</p>
			<p className="price">{precio}</p>
			<button className="button compraProducto__btnComprar">
				Comprar ahora
			</button>
		</article>
	);
};
