import { Shop } from './Shop';

export interface ShopWrapper {
	tiendas: {
		count: number;
		totalPages: number;
		currentPage: number;
		rows: Shop[];
	};
}
