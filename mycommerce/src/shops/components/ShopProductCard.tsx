import { Product } from '../../products/interfaces/Product';

export const ShopProductCard = ({
	descripcion,
	imagenes: imagenesString,
	nombre,
	precio,
}: Product) => {
	const imagenes: string[] = imagenesString.split(' ');
	console.log(imagenes);
	return (
		<section className="producto_tienda">
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)]}
				alt={nombre}
			/>
			<div className="informacion">
				<span className="tipo-envio">Disponible</span>
				<span className="precio">${precio}</span>
				<span className="precio-envio">Envio Gratis</span>
				<span className="descripcion">{descripcion}</span>
			</div>
		</section>
	);
};
