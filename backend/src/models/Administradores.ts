import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import administradorAtributtes from './interfaces/admnistradoresInterface';
import UserModel from './Usuarios';


class AdministradorModel extends Model<administradorAtributtes> implements administradorAtributtes{
    public id!: number;
    public usuario_id!: number;
    public nombre!: string;
    public imagen!: string;
    public nivel_privilegio!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
    static async getAdminByUserId (userId:number): Promise<administradorAtributtes | null>{
        const admin = await AdministradorModel.findOne({
            where: {usuario_id: userId},
            include: [{
                model: UserModel,
                as: 'userData',
                attributes:['id','correo', 'tipo_id'],
            }]
        });
        if(!admin) throw new Error('ADMIN_NOT_FOUND');
        return {
            id: admin.id!,
            usuario_id: admin.usuario_id!,
            nombre: admin.nombre!,
            imagen: admin.imagen!,
            nivel_privilegio: admin.nivel_privilegio!,
        };
    }
}

AdministradorModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        imagen: {
            type: DataTypes.STRING,
        },
        nivel_privilegio: {
            type: DataTypes.STRING,
        }

    },
    {
        sequelize,
        tableName: "administradores",
        timestamps: false,
    }
);


export default AdministradorModel;