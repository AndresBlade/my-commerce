export default interface VentasCabeceraInterface {
    id?: number
    cliente_id: number;
}

export interface returnGetPurchsesByClient {
    ventasCabecera: {
        id: number;
        cliente_id: number;
    };
    detallesProducto: {
        nombre: string;
        descripcion: string;
        precio: number;
        tiendaProducto:{
            nombre: string;
            imagen: string;
            descripcion: string;
        }
    },
    detallesVenta:{
        cantidad: number;
        precio: number;
        total: number;
        createdAt: string;
    }

}