import { SingleShopWrapper } from './SingleShopWrapper';
import { SingleShopProductsWrapper } from '../../products/interfaces/SingleShopProductsWrapper';

export interface ShopLoader {
	shopData: SingleShopWrapper;
	shopProducts: SingleShopProductsWrapper;
}
