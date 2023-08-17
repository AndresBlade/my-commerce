import { useOutletContext } from 'react-router';
import { Product } from '../../products/interfaces/Product';
import { ProductCategory } from '../../products/interfaces/ProductCategory';
import { MyShopProductCard } from '../../shops/components/MyShopProductCard';

type Props = {
	products: Product[];
	categories: ProductCategory[];
};

export const MySingleShopPage = () => {
	const { products }: Props = useOutletContext();
	return (
		<div className="misTiendas__perfilTienda perfilTienda">
			<div className="misTiendas__grid">
				{products &&
					products.map(singleProduct => {
						return (
							<MyShopProductCard
								{...singleProduct}
								key={singleProduct.id}
							/>
						);
					})}
			</div>
		</div>
	);
};
