import { useLoaderData } from 'react-router';
import { SesionModal } from '../../ui/components/SesionModal';
import { ShopProfile } from '../components/ShopProfile';
import { ShopLoader } from '../interfaces/ShopLoader';
import { ShopProductCard } from '../components/ShopProductCard';

export const ShopPage = () => {
	const { shopProducts } = useLoaderData() as ShopLoader;
	const { tiendaProducts: products } = shopProducts;
	return (
		<>
			{/* bienvenido, emprendedor          en el header */}
			<div className="Perfil__tienda">
				<ShopProfile />

				<div className="misTiendas__grid">
					{products.map(product => (
						<ShopProductCard key={product.id} {...product} />
					))}
				</div>
			</div>

			<footer></footer>

			<SesionModal />
		</>
	);
};
