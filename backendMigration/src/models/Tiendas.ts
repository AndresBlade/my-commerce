import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import TiendaModelAttributes from './interfaces/TiendaInterface';
import ClienteModel from './Clientes';
import RegionesModel from './Regiones'
import TiendasRegionesModel from './Tiendas_regiones';
import ProductoModel from './Prodcutos';


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
    static initializeAssociations(){
        //Relacion entre tienda y producto, una tienda puede tener muchos productos y un porducto pertenece a una sola tienda
        TiendaModel.hasMany(ProductoModel, {foreignKey: 'tienda_id', });
        ProductoModel.belongsTo(TiendaModel, {foreignKey: 'tienda_id', as:'tienda_producto'});

        //Relacion entre tienda y regiones, una tienda puede tener muchas regiones y muchas regiones pueden pertenecer a muchas tiendas, esta relacion se hace mediante una tabla intermedia llamada tiendas_regiones
        TiendaModel.belongsToMany(RegionesModel, {through: TiendasRegionesModel, as:'regiones_tienda',foreignKey: 'tienda_id'});
        RegionesModel.belongsToMany(TiendaModel, {through: TiendasRegionesModel, as: 'tiendas_region',foreignKey: 'region_id'});
    }
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

TiendaModel.initializeAssociations();


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
