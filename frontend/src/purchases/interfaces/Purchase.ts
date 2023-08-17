export interface Purchase {
	detallesProducto: {
		descripcion: string;
		nombre: string;
		precio: number;
		tiendaProducto: {
			descripcion: string;
			nombre: string;
			imagen: string;
		};
	};
	detallesVenta: {
		cantidad: number;
		precio: number;
		total: number;
	};
	ventasCabecera: {
		cliente_id: number;
		id: number;
	};
}
