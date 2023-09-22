import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import UserModelAttributes from './interfaces/UserInterface';
import ClienteModel from './Clientes';
import AdministradorModel from './Administradores';


class UserModel extends Model<UserModelAttributes> implements UserModelAttributes {
    public id!: number;
    public correo!: string;
    public contrasenna!: string;
    public tipo_id!: number;
    public status!: string;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //metodos personalizados
    static initializeAssociations() {
        //Relacion entre usuarios y cliente, un usuario puede tener un cliente y un cliente solo puede pertenecer a una tienda
        UserModel.hasOne(ClienteModel, {foreignKey: 'usuario_id', as: 'clientData'});
        ClienteModel.belongsTo(UserModel, {foreignKey: 'usuario_id', as: 'clientData'});

        //Relacion entre usuarios y administradores, un usuario puede tener un administrador y un administrador solo puede pertenecer a un usuario
        UserModel.hasOne(AdministradorModel, {foreignKey: 'usuario_id', as: 'userData'});
        AdministradorModel.belongsTo(UserModel, {foreignKey: 'usuario_id', as: 'userData'});        
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
        contrasenna: { 
            type: DataTypes.STRING 
        },
        tipo_id: { 
            type: DataTypes.INTEGER 
        },
        status: { 
            type: DataTypes.INTEGER 
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: true,
    }
);


UserModel.initializeAssociations();


export default UserModel;
