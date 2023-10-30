import { useLoaderData } from 'react-router';
import { ShopProfile } from '../components/ShopProfile';
import { ShopLoader } from '../interfaces/ShopLoader';
import { ShopProductCard } from '../components/ShopProductCard';
import '../../css/tiendaView.css';

export const ShopPage = () => {
	const {
		shopProducts: { productosTienda: products },
	} = useLoaderData() as ShopLoader;
	console.log(products);
	return (
		<>
			<div className="flex">
				<ShopProfile />

				<div className="flex bg-blanco w-full justify-center xl:justify-start p-4 gap-8 flex-wrap">
					{products.map(product => (
						<ShopProductCard key={product.id} {...product} />
					))}
				</div>
			</div>

			<footer></footer>
		</>
	);
};
