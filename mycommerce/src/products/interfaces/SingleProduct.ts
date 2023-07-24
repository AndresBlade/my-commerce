import { Shop } from '../../shops/interfaces/Shop';
import { Product } from './Product';

export interface SingleProduct extends Product {
	tienda: Shop;
}
