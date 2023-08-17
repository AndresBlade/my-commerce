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
		</>
	);
};
