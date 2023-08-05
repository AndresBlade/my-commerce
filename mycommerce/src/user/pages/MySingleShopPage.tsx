import { useOutletContext } from 'react-router';
import { Product } from '../../products/interfaces/Product';
import { ProductCategory } from '../../products/interfaces/ProductCategory';
import { MyShopProductCard } from '../../shops/components/MyShopProductCard';

type Props = {
	products: Product[];
	categories: ProductCategory[];
};

export const MySingleShopPage = () => {
	const { categories, products }: Props = useOutletContext();
	return (
		<div className="misTiendas__perfilTienda perfilTienda">
			<div className="misTiendas__grid">
				{products &&
					categories &&
					products.map(singleProduct => {
						const productCategory = categories.find(
							category =>
								category.id === singleProduct.categoria_id
						)?.descripcion as string;
						return (
							<MyShopProductCard
								category={productCategory}
								product={singleProduct}
								key={singleProduct.id}
							/>
						);
					})}
			</div>
		</div>
	);
};
