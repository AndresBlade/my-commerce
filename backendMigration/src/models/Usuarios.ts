import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes} from 'sequelize'
import { sequelize } from '../config/db';
import ClienteModel from './Clientes';
import UserModelAttributes from './interfaces/UserInterface';

class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
    public id!: number;
    public correo!: string;
    public contrasenna!: string;
    public tipo_id!: number;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //metodos personalizados
    
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


// UserModel.hasOne(ClienteModel,{
//     foreignKey: 'usuario_id',
//     as: 'clientData'
// })

export default UserModel;
