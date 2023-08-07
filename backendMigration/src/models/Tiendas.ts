import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import TiendaModelAttributes from './interfaces/TiendaInterface';
import ClienteModel from './Clientes';
import RegionesModel from './Regiones'
import TiendaRegionesModel from './Tiendas_regiones'
import TiendasRegionesModel from './Tiendas_regiones';
import { tiendaRegister } from '../controllers/Tiendas';

class TiendaModel extends Model<TiendaModelAttributes> implements TiendaModelAttributes{
    static findTiendaByName(tiendaName: string): TiendaModel | PromiseLike<TiendaModel> {
        throw new Error("Method not implemented.");
    }
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
    public findAllTiendasWhitRegion = function(page:number, size:number){};
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


TiendaModel.prototype.findAllTiendasWhitRegion = async function(page:number, size:number){
    const result = await TiendaModel.findAndCountAll({
        limit: +size,
        offset: +page * +size,
        distinct:true,
        include: [
            {
                model: RegionesModel,
                as:'regiones_tienda',
                through:{
                    attributes:[]
                }
            }
        ]
    });
    const totalRecords = result.count;
    const totalPages = Math.ceil(totalRecords / +size);
    return {
        count: totalRecords,
        totalPages: totalPages,
        currentPage: ++page,
        rows: result.rows
    };
}


TiendaModel.prototype.findTiendaByName = async function(tiendaName:string){
    const tienda = await TiendaModel.findOne({
        where: { nombre: tiendaName },
        include: [
        { 
            model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        },
        {
            model: RegionesModel,
            as:'regiones_tienda',
            through:{
                attributes:[]
            }
        }
    ]
    });
    
    return tienda
}


TiendaModel.prototype.findTiendaByRIF = async function(tiendaRIF:number){
    return TiendaModel.findAll({
        where: { RIF: tiendaRIF },
        include:[ 
        { 
            model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        },
        {
            model: RegionesModel,
            as:'regiones_tienda',
            through:{
                attributes:[]
            }
        }
    ]
    });
}


TiendaModel.prototype.findTiendaByClient = async function(clientID:number){
    return TiendaModel.findAll({
        where: { cliente_id: clientID },
        include:[
        { 
            model: ClienteModel, 
            as: 'tienda_cliente',
            attributes: ['id', 'nombre', 'imagen', 'createdAt']
        },
        {
            model: RegionesModel,
            as:'regiones_tienda',
            through:{
                attributes:[]
            }
        }
    ]
    });
}


export default TiendaModel;
