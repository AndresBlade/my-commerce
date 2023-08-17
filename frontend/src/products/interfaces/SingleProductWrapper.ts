import { Product } from './Product';

export interface SingleProductWrapper {
	product: Product & {
		tiendaProducto: { RIF: number; nombre: string; imagen: string };
	};
}
