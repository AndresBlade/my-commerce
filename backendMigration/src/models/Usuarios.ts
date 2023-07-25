import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes} from 'sequelize'
import { sequelize } from '../config/db';
import { UUIDV4 } from 'sequelize';

interface UserModelAttributes {
    id: number;
    correo: string;
    contrasenna: string;
    tipo_id: number;
}

    
class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
    public id!: number;
    public correo!: string;
    public contrasenna!: string;
    public tipo_id!: number;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        correo: { type: DataTypes.STRING},
        contrasenna: { type: DataTypes.STRING },
        tipo_id: { type: DataTypes.INTEGER },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
    }
);

export default UserModel;
