import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo, HasMany, BelongsToGetAssociationMixin} from 'sequelize'
import { sequelize } from '../config/db';
import ClienteModelAttributes from './interfaces/ClienteInterface';
import UserModel from './Usuarios';


class ClienteModel extends Model<ClienteModelAttributes> implements ClienteModelAttributes {
    public id!: number;
    public usuario_id!: number;
    public nombre!: string;
    public imagen!: string;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Metodos personalizados
    // public async findUserAndClient(cliente_id: number){
    //     return ClienteModel.findOne({
    //         where: {id: cliente_id},
    //         include:{
    //             model: UserModel,
    //             as: 'usuario'

    //         }
    //     })
    // }
}

ClienteModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario_id: { 
            type: DataTypes.INTEGER,
        },
        nombre: {
             type: DataTypes.STRING 
        },
        imagen: {
             type: DataTypes.STRING 
        },
    },
    {
        sequelize,
        tableName: "clientes",
        timestamps: true,
    }
);






export default ClienteModel;
