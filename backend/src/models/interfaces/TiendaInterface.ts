export default interface TiendaModelAttributes {
    RIF: number;
    cliente_id: number;   
    nombre: string;
    imagen: string;
    status: string;
    descripcion?: string;
    saldo?: GLfloat | number;
}