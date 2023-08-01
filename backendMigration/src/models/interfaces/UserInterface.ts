export default interface UserModelAttributes {
    id?: number;
    correo: string;
    contrasenna: string;
    tipo_id: number;
    cliente?: any;
}