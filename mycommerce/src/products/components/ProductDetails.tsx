import { useState } from 'react';
import { SingleProduct } from '../interfaces/SingleProduct';
import { Link } from 'react-router-dom';
import { createPurchase } from '../../purchases/helpers/createPurchase';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

const handleSubmit = (
	purchase: { producto_id: number; cantidad: number; precio: number },
	token: string,
	setPurchaseState: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
	createPurchase(purchase, token)
		.then(() => setPurchaseState(true))
		.catch(() => setPurchaseState(false));
};

export const ProductDetails = ({
	tienda,
	nombre,
	descripcion,
	precio,
	id,
}: SingleProduct) => {
	const [purchaseCompleted, setPurchaseCompleted] = useState<boolean>();
	const {
		userData: { token },
	} = useContext(AuthContext);
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
							precio: parseFloat(precio),
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
