import { Model, DataTypes, Op} from 'sequelize'
import { sequelize } from '../config/db';
import TiendaModelAttributes from './interfaces/TiendaInterface';
import ClienteModel from './Clientes';
import RegionesModel from './Regiones'
import TiendasRegionesModel from './Tiendas_regiones';
import ProductoModel from './Prodcutos';
import VentasCabeceraModel from './Ventas_cabecera';
 

class TiendaModel extends Model<TiendaModelAttributes> implements TiendaModelAttributes{
    public RIF!: number;
    public nombre!: string;
    public imagen!: string;
    public status!: string;
    public cliente_id!: number;
    public descripcion!: string;
    public saldo!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Metodos personalizados
    static initializeAssociations(){
        //Relacion entre tienda y producto, una tienda puede tener muchos productos y un porducto pertenece a una sola tienda
        TiendaModel.hasMany(ProductoModel, {foreignKey: 'tienda_id', });
        ProductoModel.belongsTo(TiendaModel, {foreignKey: 'tienda_id', as:'tiendaProducto'});

        //Relacion entre tienda y regiones, una tienda puede tener muchas regiones y muchas regiones pueden pertenecer a muchas tiendas, esta relacion se hace mediante una tabla intermedia llamada tiendas_regiones
        TiendaModel.belongsToMany(RegionesModel, {through: TiendasRegionesModel, as:'regionesTienda',foreignKey: 'tienda_id'});
        RegionesModel.belongsToMany(TiendaModel, {through: TiendasRegionesModel, as: 'tiendasRegion',foreignKey: 'region_id'});
    }


    static findTiendaByName = async function(tiendaName:string):Promise<TiendaModel[] | null>{
        const tiendas = await TiendaModel.findAll({
            //devuelve solo las tiendas que esten activas/aceptadas y que el nombre coincida con el parametro
            where: { 
                nombre: {[Op.like]: `%${tiendaName}%`}, 
                status: '1' 
            },
            attributes: ['nombre','imagen','descripcion'],
            include: [
            { 
                model: ClienteModel, 
                as: 'tiendaCliente',
                attributes: ['id', 'nombre', 'imagen']
            },
            {
                model: RegionesModel,
                as:'regionesTienda',
                through:{
                    attributes:[]
                }
            }
        ]
        });

        if(!tiendas) throw new Error('ERROR_GETTING_TIENDAS_BY_NAME');
        
        return tiendas
    };


    static findTiendaByRIF = async function(tiendaRIF:number):Promise<TiendaModel | null>{
        const tienda = TiendaModel.findOne({
            where: {  RIF: tiendaRIF },
            include:[ 
                { 
                    model: ClienteModel, 
                    as: 'tiendaCliente',
                    attributes: ['id', 'nombre', 'imagen','createdAt']
                },
                {
                    model: RegionesModel,
                    as:'regionesTienda',
                    through:{
                        attributes:[]
                    }
                }
            ]
        });

        if(!tienda) throw new Error('ERROR_GETTING_TIENDA_BY_RIF');

        return tienda
    };


    static findTiendaByClient = async function(clientID:number):Promise<TiendaModel[]>{
        const tiendas =  TiendaModel.findAll({
            where: { 
                cliente_id: clientID,
                status:'1' //Solo retorna las tiendas que estén aceptadas
            },
            include:[
            { 
                model: ClienteModel, 
                as: 'tiendaCliente',
                attributes: ['id', 'nombre','imagen', 'createdAt']
            },
            {
                model: RegionesModel,
                as:'regionesTienda',
                through:{
                    attributes:[]
                }
            }
        ]
        });

        if(!tiendas) throw new Error('ERROR_GETTING_TIENDAS_BY_CLIENT');

        return tiendas
    };


    static findAllTiendasWhitRegion = async function(page:number, size:number, status:string):Promise<{ count: number,totalPages:number, currentPage:number,rows: TiendaModel[] }>{
        const result = await TiendaModel.findAndCountAll({
            where:{status: status}, //Devuelve solo las tiendas que tengan el status que se le pase por parametro (0,1,2)
            limit: +size,
            offset: +page * +size,
            distinct:true,
            include: [
                {
                    model: RegionesModel,
                    as:'regionesTienda',
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
    };


    static getAllSells = async function(tiendaId:number){
        const salesDetails = await ProductoModel.findAll({
            where: {
                tienda_id: tiendaId,
            },
            attributes: ['id', 'nombre', 'precio', 'descripcion', 'categoria_id'],
            include: [
                {
                    model: VentasCabeceraModel,
                    as: 'ProductosVendidos',
                    attributes: ['createdAt'],  
                    through: {
                        as: 'detallesCompra',
                    },
                },
            ],
            
        });

        if(!salesDetails) throw new Error('ERROR_GETTING_SALES_DETAILS_BY_TIENDA_ID');

        return salesDetails;
    };


    static updateSaldo = async function(tiendaRIF:number, cantidad:number, price:number){
        const tienda = await TiendaModel.findOne({
            where: { RIF: tiendaRIF },
        });

        if(!tienda) throw new Error('ERROR_GETTING_TIENDA_BY_RIF');

        tienda.increment('saldo', {by: cantidad * price})
    };

    static deleteTienda = async function(tiendaRIF:number){ 
        const resultTransaction = await sequelize.transaction(async (t:any) => {
            const tienda = await TiendaModel.findOne({
                where: { RIF: tiendaRIF },
            });
    
            if(!tienda) throw new Error('ERROR_GETTING_TIENDA_BY_RIF');
            tienda.update({status: '2'}, {transaction: t});

            const productsDesactivate = await ProductoModel.desactivateProductsPerTienda(tienda.RIF);
            if(!productsDesactivate) throw new Error('No se pudo desactivar los productos de las tiendas del cliente');

            return true;
        })

        if(!resultTransaction) throw new Error('ERROR_DELETING_TIENDA_BY_RIF');
        else return true;
    }

    static acceptTiendaOnStandby =async (RIF:number) => {
        const tienda = await TiendaModel.findOne({
            where: { RIF: RIF },
        });

        if(!tienda) throw new Error('ERROR_GETTING_TIENDA_BY_RIF');
        tienda.update({status: '1'});

        return true;   
    }

    static rejectTiendaOnStandby =async (RIF:number) => {
        const tienda = await TiendaModel.findOne({
            where: { RIF: RIF },
        });

        if(!tienda) throw new Error('ERROR_GETTING_TIENDA_BY_RIF');
        tienda.update({status: '2'});

        return true;   
    }
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


export default TiendaModel;
