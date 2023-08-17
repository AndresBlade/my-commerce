import { Product } from './Product';

export interface ProductWrapper {
	products: {
		count: number;
		totalPages: number;
		currentPage: number;
		rows: Product[];
	};
}
