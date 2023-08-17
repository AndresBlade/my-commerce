import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPurchase } from '../../purchases/helpers/createPurchase';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { Product } from '../interfaces/Product';

const handleSubmit = (
	purchase: { producto_id: number; cantidad: number },
	token: string,
	setPurchaseState: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
	createPurchase(token, purchase)
		.then(response => {
			console.log(response);
			setPurchaseState(true);
		})
		.catch(() => setPurchaseState(false));
};

export const ProductDetails = ({
	nombre,
	descripcion,
	precio,
	id,
	tiendaProducto,
}: Product & {
	tiendaProducto: { RIF: number; nombre: string; imagen: string };
}) => {
	const [purchaseCompleted, setPurchaseCompleted] = useState<boolean>();
	const {
		user: { token },
	} = useContext(AuthContext);
	console.log(tiendaProducto);
	return (
		<article className="details">
			<div className="container_tienda">
				<img
					src={tiendaProducto.imagen}
					className="img_tienda"
					alt={tiendaProducto.nombre}
				/>
				<Link
					to={`/tienda/${tiendaProducto.RIF}`}
					className="tiendaName"
				>
					{tiendaProducto.nombre}
				</Link>
			</div>
			<h2 className="productName">{nombre}</h2>
			<p className="descripcion">{descripcion}</p>
			<p className="price">{precio}</p>
			<button
				className={`button compraProducto__btnComprar ${
					purchaseCompleted === undefined
						? ''
						: purchaseCompleted
						? 'compraProducto__btnComprar--comprado'
						: 'compraProducto__btnComprar--error'
				}`}
				onClick={() =>
					handleSubmit(
						{
							producto_id: id,
							cantidad: 1,
						},
						token,
						setPurchaseCompleted
					)
				}
			>
				{purchaseCompleted === undefined
					? 'Comprar Ahora'
					: purchaseCompleted
					? 'Comprado exitosamente!'
					: 'Error al comprar'}
			</button>
		</article>
	);
};
