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
		<article className="w-[550px] h-[550px] bg-blanco flex rounded-lg flex-col p-8">
			<div className="w-full mb-4 flex gap-8 items-center">
				<img
					src={tienda.imagen}
					className="w-[100px] h-[100px] rounded-full"
					alt={tienda.nombre}
				/>
				<Link to={`/tienda/${tienda.RIF}`} className="text-[2rem] font-normal">
					{tienda.nombre}
				</Link>
			</div>
			<h2 className="text-[1.7rem] mb-10 font-semibold">{nombre}</h2>
			<p className="text-[.9rem] mb-10">{descripcion}</p>
			<p className="text-[1.7rem] font-semibold w-full mb-12">{precio}</p>
			<button
				className={` flex items-center justify-center bg-dark-blue px-12 py-4 w-full rounded-lg border-none text-blanco text-[.9rem] font-bold hover:opacity-70 ${
					purchaseCompleted === undefined
						? ''
						: purchaseCompleted
						? 'bg-green-500 cursor-not-allowed'
						: 'bg-red-500 cursor-not-allowed '
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
					? '¡Comprado exitosamente!'
					: 'Error al comprar'}
			</button>
		</article>
	);
};
