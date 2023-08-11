import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo, HasMany, BelongsToGetAssociationMixin} from 'sequelize'
import { sequelize } from '../config/db';
import ClienteModelAttributes from './interfaces/ClienteInterface';
import UserModel from './Usuarios';
import TiendaModel from './Tiendas';
import VentasCabeceraModel from './Ventas_cabecera';


class ClienteModel extends Model<ClienteModelAttributes> implements ClienteModelAttributes {
    static findClientByUserID = async function(user_id: number): Promise<ClienteModelAttributes | null>{
        const client = await ClienteModel.findOne({
            where: {usuario_id: user_id},
        })
        return{
            id: client?.id,
            usuario_id: client!.usuario_id,
            nombre: client!.nombre,
            imagen: client!.imagen,
        }
    }
    public id!: number;
    public usuario_id!: number;
    public nombre!: string;
    public imagen!: string;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //metodos personalizados
    
    public getPurchsesByClient = async function (client_id:number){};

    static initializeAssociations() {
        //Relacion entre cliente y tiendas, un cliente puede tener muchas tiendas y una tienda pertenece a un solo cliente
        ClienteModel.hasMany(TiendaModel, {foreignKey: 'cliente_id', as: 'tiendaCliente',});
        TiendaModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id', as: 'tiendaCliente',});

        //Relacion entre Cliente y ventas cabecera, un cliente puede tener muchas ventas cabecera y una venta cabecera pertenece a un solo cliente
        ClienteModel.hasMany(VentasCabeceraModel, {foreignKey: 'cliente_id'});
        VentasCabeceraModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id'});
    }

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

ClienteModel.initializeAssociations();


// ClienteModel.prototype.findClientByUserID = async function(user_id: number): Promise<ClienteModelAttributes | null> {
//     const client = await ClienteModel.findOne({
//         where: {usuario_id: user_id},
//         attributes: ['correo', 'tipo_id'],
//         include:{
//             model: ClienteModel,
//             as: 'clientData',
//             attributes: ['id', 'nombre', 'imagen', 'createdAt']
//         }
//     })
//     return{
//         id: client?.id,
//         usuario_id: client!.usuario_id,
//         nombre: client!.nombre,
//         imagen: client!.imagen,
//     }
// }



    
export default ClienteModel;
