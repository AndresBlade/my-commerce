import { useEffect, useState } from 'react';
import { Shop } from '../interfaces/Shop';
import { getShops } from '../helpers/getShops';
import { ShopWrapper } from '../interfaces/ShopWrapper';
import { ShopCard } from './ShopCard';
import { useLoaderData } from 'react-router-dom';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export const ShopList = () => {
	const { ShopsData } = useLoaderData() as LandingLoader;
	// const [shops, setShops] = useState<Shop[] | undefined>(undefined);

	// useEffect(() => {
	// 	getShops()
	// 		.then((response: ShopWrapper) => {
	// 			setShops(response.tiendas);
	// 		})
	// 		.catch(error => console.log(error));
	// }, []);
	return (
		<div className="tiendas-container">
			{ShopsData.tiendas?.map(shop => (
				<ShopCard key={shop.RIF} {...shop} />
			))}
		</div>
	);
};
