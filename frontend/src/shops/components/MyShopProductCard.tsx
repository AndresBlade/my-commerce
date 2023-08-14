import { Product } from '../../products/interfaces/Product';
type Props = {
	product: Product;
	category: string;
};

export const MyShopProductCard = ({
	product: { descripcion, imagenes: imagenesString, nombre, precio },
	category,
}: Props) => {
	const imagenes: string[] = imagenesString.split(' ');

	return (
		<div className="producto_tienda_perfil">
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)]}
				alt={nombre}
				className="productosTienda__imagenProducto"
			/>
			<p className="productosTienda__precioProducto">{precio}</p>
			<h4 className="productosTienda__nombreProducto">{nombre}</h4>
			<span className="productosTienda__descripcionProducto">
				{descripcion}
			</span>
			<span className="productosTienda__categoriaProducto">
				{category}
			</span>
		</div>
	);
};
