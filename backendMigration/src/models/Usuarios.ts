import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes} from 'sequelize'
import { sequelize } from '../config/db';
import UserModelAttributes from './interfaces/UserInterface';
import ClienteModel from './Clientes';

class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
    public id!: number;
    public correo!: string;
    public contrasenna!: string;
    public tipo_id!: number;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //metodos
    public async findUserAndClient(user_id: number){
        return UserModel.findOne({
            where: {id: user_id},
            attributes: ['id', 'correo', 'tipo_id'],
            include:{
                model: ClienteModel,
                as: 'cliente',
                attributes: ['id'] 
            }
        })
    }
}

UserModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        correo: { 
            type: DataTypes.STRING,
            unique: true,
        },
        contrasenna: { type: DataTypes.STRING },
        tipo_id: { type: DataTypes.INTEGER },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
    }
);

UserModel.hasOne(ClienteModel, {
    foreignKey: 'usuario_id',
    as: 'cliente'
})

// UserModel.prototype.findUserAndClient = async function(user_id: number){

// }

export default UserModel;
