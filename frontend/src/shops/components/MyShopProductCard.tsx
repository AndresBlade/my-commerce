import { memo } from 'react';
import { Product } from '../../products/interfaces/Product';

export const MyShopProductCard = memo(
	({
		descripcion,
		imagenes,
		nombre,
		precio,
		categoria: { descripcion: categoryDescription },
	}: Product) => {
		return (
			<div className="producto_tienda_perfil">
				<img
					src={
						imagenes[Math.floor(Math.random() * imagenes.length)]
							.ruta
					}
					alt={nombre}
					className="productosTienda__imagenProducto"
				/>
				<p className="">{precio}</p>
				<h4 className="">{nombre}</h4>
				<span className="">
					{descripcion}
				</span>
				<span className="">
					{categoryDescription}
				</span>
			</div>
		);
	}
);
