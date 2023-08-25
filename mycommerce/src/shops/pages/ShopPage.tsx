import { useLoaderData } from 'react-router';
import { SesionModal } from '../../ui/components/SesionModal';
import { ShopProfile } from '../components/ShopProfile';
import { ShopLoader } from '../interfaces/ShopLoader';
import { ShopProductCard } from '../components/ShopProductCard';
import '../../css/tiendaView.css';

export const ShopPage = () => {
	const { shopProducts } = useLoaderData() as ShopLoader;
	const { tiendaProducts: products } = shopProducts;
	return (
		<>
			{/* bienvenido, emprendedor          en el header */}
			<div className="flex">
				<ShopProfile />

				<div className="flex bg-blanco w-full justify-center lg:justify-between p-4 gap-8 flex-wrap">
					{products.map(product => (
						<ShopProductCard key={product.id} {...product} />
					))}
				</div>
			</div>
			<SesionModal />
		</>
	);
};
