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

    //metodos personalizados
    public findClientAndUser = function(client_id: number){}

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


ClienteModel.prototype.findClientAndUser = async function(user_id: number){
    return UserModel.findOne({
        where: {id: user_id},
        attributes: ['correo', 'tipo_id'],
        include:{
            model: ClienteModel,
            as: 'cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        }
    })
}

    
export default ClienteModel;
