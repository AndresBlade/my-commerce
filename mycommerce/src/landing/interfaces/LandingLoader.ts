import { ProductWrapper } from '../../products/interfaces/ProductWrapper';
import { ShopWrapper } from '../../shops/interfaces/ShopWrapper';

export interface LandingLoader {
	ShopsData: ShopWrapper;
	ProductsData: ProductWrapper;
}
