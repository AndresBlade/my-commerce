import { useEffect, useState } from 'react';
import { getProducts } from '../helpers/getProducts';
import { Product } from '../interfaces/Product';
import { ProductWrapper } from '../interfaces/ProductWrapper';
import { ProductCard } from './ProductCard';

export function ProductList() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
	let [products, setProducts] = useState<Product[] | undefined>(undefined);

	useEffect(() => {
		getProducts()
			.then((response: ProductWrapper) => {
				setProducts(response.products);
			})
			.catch(error => console.log(error));
	}, []);

	console.log(products);

	return (
		<div className="grid">
			{products?.map(product => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
}
