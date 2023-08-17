import { Region } from './ShopRegion';

export interface Shop {
	cliente_id: number;
	createdAt: string;
	descripcion: string;
	imagen: string;
	nombre: string;
	regionesTienda: Region[];
	RIF: number;
	saldo: string;
	status: string;
	tiendaCliente: {
		createdAt: string;
		id: number;
		imagen: string;
		nombre: string;
	};
	updatedAt: Date;
}
