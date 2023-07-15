export interface Product {
	id: number;
	nombre: string;
	precio: string;
	categoria_id: number;
	tienda_id: number;
	descripcion: string;
	imagenes: string;
	createdAt: Date;
	updatedAt: Date;
}
