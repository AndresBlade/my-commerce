export default interface UserModelAttributes {
    //atributo principales
    id?: number;
    correo: string;
    contrasenna: string;
    tipo_id: number;
    status: string;

    //atributos de auditoria
    cliente?: any;
    
}