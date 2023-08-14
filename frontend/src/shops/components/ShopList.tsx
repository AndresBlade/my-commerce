import { ShopCard } from './ShopCard';
import { useLoaderData } from 'react-router-dom';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export const ShopList = () => {
	const { ShopsData } = useLoaderData() as LandingLoader;

	console.log(useLoaderData());
	return (
		<div className="grid" id="gridTienda">
			{ShopsData.tiendas?.map(shop => (
				<ShopCard key={shop.RIF} {...shop} />
			))}
		</div>
	);
};
