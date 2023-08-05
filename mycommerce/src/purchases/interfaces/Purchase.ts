export interface Purchase {
	cliente_id: number;
	createdAt: string;
	venta_detalle: VentaDetalle;
}

interface VentaDetalle {
	cantidad: number;
	precio: string;
	producto: Producto;
}

interface Producto {
	nombre: string;
}
