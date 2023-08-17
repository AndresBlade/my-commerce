import { ProductCategory } from './ProductCategory';

export interface Product {
	id: number;
	nombre: string;
	precio: string;
	descripcion: string;
	cantidad: number;
	createdAt: Date;
	imagenes: Images[];
	categoria: ProductCategory;
}

interface Images {
	ruta: string;
}
