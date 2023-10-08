import { PendingRegisterShop } from '../../shops/interfaces/PendingRegisterShop';

interface Props {
	shop: PendingRegisterShop;
	setPendingShops: React.Dispatch<
		React.SetStateAction<null | PendingRegisterShop[]>
	>;
}

export const ShopRegisterCard = ({ shop, setPendingShops }: Props) => {
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
					reviewNextShop();
				}}
			>
				Aceptar
			</button>
			<button
				onClick={() => {
					reviewNextShop();
				}}
			>
				Denegar
			</button>
		</div>
	);
};
