import { ProductCard } from './ProductCard';
import { useLoaderData } from 'react-router';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export function ProductList() {
	const { ProductsData } = useLoaderData() as LandingLoader;

	return (
		<div className="grid">
			{ProductsData.products?.map(product => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
}
