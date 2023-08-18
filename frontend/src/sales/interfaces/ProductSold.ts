import { Product } from '../../products/interfaces/Product';
export interface ProductSold
	extends Omit<Product, 'cantidad' | 'createdAt' | 'imagenes' | 'categoria'> {
	categoria_id: number;
	ProductosVendidos: SaleDetails[];
}

export interface SaleDetails {
	createdAt: string;
	detallesCompra: {
		producto_id: number;
		ventas_cabecera_id: number;
		cantidad: number;
		precio: string;
	};
}
