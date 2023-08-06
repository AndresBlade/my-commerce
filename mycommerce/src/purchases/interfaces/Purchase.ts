import { SaleDetails } from '../../sales/interfaces/Sale';

export interface Purchase {
	cliente_id: number;
	createdAt: string;
	venta_detalle: SaleDetails;
}
