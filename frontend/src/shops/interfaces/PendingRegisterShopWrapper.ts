import { PendingRegisterShop } from './PendingRegisterShop';

export interface PendingRegisterShopWrapper {
	tiendasOnStandby: {
		count: number;
		totalPages: number;
		currentPage: number;
		rows: PendingRegisterShop[];
	};
}
