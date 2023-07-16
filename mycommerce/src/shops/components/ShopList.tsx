import { useEffect, useState } from 'react';
import { Shop } from '../interfaces/Shop';
import { getShops } from '../helpers/getShops';
import { ShopWrapper } from '../interfaces/ShopWrapper';
import { ShopCard } from './ShopCard';

export const ShopList = () => {
	const [shops, setShops] = useState<Shop[] | undefined>(undefined);

	useEffect(() => {
		getShops()
			.then((response: ShopWrapper) => {
				setShops(response.tiendas);
			})
			.catch(error => console.log(error));
	}, []);
	return (
		<div className="tiendas-container">
			{shops?.map(shop => (
				<ShopCard key={shop.RIF} {...shop} />
			))}
		</div>
	);
};
