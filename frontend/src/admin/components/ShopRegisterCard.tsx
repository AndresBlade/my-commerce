import { AuthContext } from '../../auth/context/AuthContext';
import { PendingRegisterShop } from '../../shops/interfaces/PendingRegisterShop';
import { useContext } from 'react';
import { determineShopRegister } from '../helpers/DetermineShopRegister';

interface Props {
	shop: PendingRegisterShop;
	setPendingShops: React.Dispatch<
		React.SetStateAction<null | PendingRegisterShop[]>
	>;
}

export const ShopRegisterCard = ({ shop, setPendingShops }: Props) => {
	const {
		user: { token },
	} = useContext(AuthContext);

	const reviewNextShop = () => {
		setPendingShops(pendingShops => {
			const newPendingShops = pendingShops ? pendingShops.slice(1) : null;
			console.log('cambio');
			console.log(newPendingShops);
			return newPendingShops;
		});
	};

	return (
		<div>
			<h2>{shop.nombre}</h2>
			<h4>{shop.RIF}</h4>
			<img src={shop.imagen} alt={shop.nombre} />
			<span>La tienda opera en:</span>
			<ul>
				{shop.regionesTienda.map(region => (
					<li key={region.id}>{region.descripcion}</li>
				))}
			</ul>
			<p>{shop.descripcion}</p>
			<button
				onClick={() => {
					determineShopRegister(shop.RIF, token, true)
						//TIENDA_ACCEPTED_SUCCESSFULLY
						//TIENDA_DENIED_SUCCESSFULLY
						.then(response => {
							console.log(response);
							reviewNextShop();
						})
						.catch((err: Error) => {
							//NOT_PAYLOAD_DATA
							return console.log(err.message);
						});
				}}
			>
				Aceptar
			</button>
			<button
				onClick={() => {
					determineShopRegister(shop.RIF, token, false)
						.then(response => {
							console.log(response);
							reviewNextShop();
						})
						.catch((err: Error) => {
							return console.log(err.message);
						});
					reviewNextShop();
				}}
			>
				Denegar
			</button>
		</div>
	);
};
