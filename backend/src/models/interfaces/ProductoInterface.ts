export default interface ProductoModelAttributes {
    id?: number;
    nombre: string;
    precio:number;
    categoria_id : number;
    status:string;  
    tienda_id: number;
    descripcion: string,
    cantidad: number,
}