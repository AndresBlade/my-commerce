import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import TiendaModelAttributes from './interfaces/TiendaInterface';
import ClienteModel from './Clientes';

class TiendaModel extends Model<TiendaModelAttributes> implements TiendaModelAttributes{
    public RIF!: number;
    public nombre!: string;
    public imagen!: string;
    public status!: string;
    public cliente_id!: number;
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public descripcion!: string;
    public saldo!: number;

    // Metodos personalizados
    public findTiendaByName = function(tiendaName:string){};
    public findTiendaByRIF = function(tiendaRIF:number){};
    public findTiendaByClient = function(clientID:number){};
}

TiendaModel.init(
    {
        RIF: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('En espera', 'Aceptada', 'Rechazada')
        },
        cliente_id: {
            type: DataTypes.INTEGER,
        },
        descripcion: {
            type: DataTypes.STRING
        },
        saldo:{
            type: DataTypes.FLOAT
        }
    },
    {
        sequelize,
        tableName: "tiendas",
        timestamps: true,
    }
);


TiendaModel.belongsTo(ClienteModel, {
    foreignKey: 'cliente_id',
    as: 'tienda_cliente'
});

TiendaModel.prototype.findTiendaByName = async function(tiendaName:string){
    return TiendaModel.findAll({
        where: { nombre: tiendaName },
        include: { model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        }
    });
}

TiendaModel.prototype.findTiendaByRIF = async function(tiendaRIF:number){
    return TiendaModel.findAll({
        where: { RIF: tiendaRIF },
        include: { model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        }
    });
}

TiendaModel.prototype.findTiendaByClient = async function(clientID:number){
    return TiendaModel.findAll({
        where: { cliente_id: clientID },
        include: { model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        }
    });
}

export default TiendaModel;
