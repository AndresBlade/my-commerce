export interface Sale {
	createdAt: string;
	venta_cabecera: SaleHeader;
}

export interface SaleHeader {
	cliente_id: number;
	ventas_detalles_id: number;
	venta_detalle: SaleDetails;
	cliente: Client;
}

interface Product {
	nombre: string;
}
interface Client {
	nombre: string;
}

export interface SaleDetails {
	precio: string;
	cantidad: number;
	producto: Product;
}
