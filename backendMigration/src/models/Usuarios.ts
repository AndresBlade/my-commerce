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

    //metodos personalizados
    static initializeAssociations() {
        //Relacion entre cliente y tiendas, un cliente puede tener muchas tiendas y una tienda pertenece a un solo cliente
        UserModel.hasOne(ClienteModel, {foreignKey: 'usuario_id', as: 'clientData'});
        ClienteModel.belongsTo(UserModel, {foreignKey: 'usuario_id', as: 'clientData'});

        
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

UserModel.initializeAssociations();



export default UserModel;
