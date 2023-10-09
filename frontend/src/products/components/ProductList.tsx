import { ProductCard } from './ProductCard';
import { useLoaderData } from 'react-router';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';

export function ProductList() {
	const { ProductsData } = useLoaderData() as LandingLoader;

	return (
		<div className="grid gap-5 my-4 mx-auto w-full md:grid-cols-2 lg:grid-cols-3">
			{ProductsData.products.rows.map(product => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
}
