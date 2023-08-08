import { ShopCard } from './ShopCard';
import { useLoaderData } from 'react-router-dom';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export const ShopList = () => {
	const { ShopsData } = useLoaderData() as LandingLoader;

	console.log(useLoaderData());
	return (
		<div className="flex flex-wrap justify-center gap-5 mx-auto" id="gridTienda">
			{ShopsData.tiendas?.map(shop => (
				<ShopCard key={shop.RIF} {...shop} />
			))}
		</div>
	);
};
