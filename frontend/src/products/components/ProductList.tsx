import { ProductCard } from './ProductCard';
import { useLoaderData } from 'react-router';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export function ProductList() {
	const { ProductsData } = useLoaderData() as LandingLoader;

	return (
		<div className="flex justify-center gap-5 mx-auto">
			{ProductsData.products.rows.map(product => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
}
