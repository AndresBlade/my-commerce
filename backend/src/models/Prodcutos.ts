import {Model, DataTypes,} from 'sequelize'
import { sequelize } from '../config/db';
import ProductoModelAttributes from './interfaces/ProductoInterface';
import CategoriaModel from './Categorias';
import PorductImagenModel from './Productos_imagenes';
import TiendaModel from './Tiendas';


class ProductoModel extends Model<ProductoModelAttributes> implements ProductoModelAttributes{
    public id!: number;
    public nombre!: string;
    public precio!: number;
    public categoria_id!: number;
    public tienda_id!: number;
    public descripcion!: string;
    public cantidad!: number;
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados

    static initializeAssociations(){
        //Relacion entre producto y categoria, un producto puede tener una categoria y una categoria puede tener muchos productos
        ProductoModel.belongsTo(CategoriaModel, {foreignKey: 'categoria_id', as: 'categoria',});
        CategoriaModel.hasMany(ProductoModel, {foreignKey: 'categoria_id', as: 'categoria'});

        //relacion ente producto y imagenes, un producto puede tener muchas imagenes y una imagen pertenece a un solo producto
        ProductoModel.hasMany(PorductImagenModel, {foreignKey: 'producto_id', as: 'imagenes',});
        PorductImagenModel.belongsTo(ProductoModel, {foreignKey: 'producto_id', as: 'imagenes',});

        
    }
    static async findAllProducts(page: number, size: number): Promise<{ count: number,totalPages:number, currentPage:number ,rows: number } | { count: any; rows: any; }> {
        const result = await ProductoModel.findAndCountAll({
            limit: +size,
            offset: +page * +size,
            attributes: ['id', 'nombre', 'precio', 'descripcion', 'cantidad', 'createdAt'],
            distinct:true,
            include:[
                {
                    model: PorductImagenModel,
                    as: 'imagenes',
                    attributes: ['ruta'],
                },
                {
                    model: CategoriaModel,
                    as: 'categoria',
                    attributes: ['id', 'descripcion']
                }
            ],
        });
        const totalRecords = result.count;
        const totalPages = Math.ceil(totalRecords / +size);
        return {
            count: totalRecords,
            totalPages: totalPages,
            currentPage: ++page,
            rows: result.rows
        };
    ;
    }

    public findAllProducts = function(_page:number, _size:number){};
    public findProductByID = function(_productID:number){};
    public getProductsByTiendaRIF = function(_tiendaRIF:number){};
    public findProductsByName = function(_productName:string){};
    public getProductsByCategory = function(_categoria_id:number){};

}


ProductoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.FLOAT
        },
        categoria_id: {
            type: DataTypes.INTEGER
        },
        tienda_id:{
            type: DataTypes.INTEGER,
        },
        descripcion: {
            type: DataTypes.STRING
        },
        cantidad:{
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        tableName: "productos",
        timestamps: true,
    }
);

ProductoModel.initializeAssociations();


ProductoModel.prototype.getProductsByTiendaRIF = async function(tiendaRIF:number){
    return ProductoModel.findAll({
        where: { tienda_id: tiendaRIF },
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'cantidad', 'createdAt'],
        include:[
            {
                model: PorductImagenModel,
                as: 'imagenes',
                attributes: ['ruta'],
            },
            {
                model: CategoriaModel,
                as: 'categoria',
                attributes: ['id', 'descripcion']
            }
        ],
        
    });
}


ProductoModel.prototype.findProductsByName = async function(productName:string){
    return ProductoModel.findAll({
        where: { nombre: productName },
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'cantidad', 'createdAt'],
        include:[
            {
                model: PorductImagenModel,
                as: 'imagenes',
                attributes: ['ruta'],
            },
            {
                model: CategoriaModel,
                as: 'categoria',
                attributes: ['id', 'descripcion']
            }
        ],
        
    });
}


ProductoModel.prototype.findProductByID = async function(productID:number){
    return ProductoModel.findOne({
        where: { id: productID },
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'cantidad', 'createdAt'],
        include:[
            {
                model: PorductImagenModel,
                as: 'imagenes',
                attributes: ['ruta'],
            },
            {
                model: CategoriaModel,
                as: 'categoria',
                attributes: ['id', 'descripcion']
            },
            {
                model:TiendaModel,
                as:'tiendaProducto',
                attributes: ['RIF','nombre', 'imagen']
            }
        ],
        
    });
}   

ProductoModel.prototype.findAllProducts = async function(page:number, size:number){
    const result = await ProductoModel.findAndCountAll({
        limit: +size,
        offset: +page * +size,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'cantidad', 'createdAt'],
        distinct:true,
        include:[
            {
                model: PorductImagenModel,
                as: 'imagenes',
                attributes: ['ruta'],
            },
            {
                model: CategoriaModel,
                as: 'categoria',
                attributes: ['id', 'descripcion']
            }
        ],
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

export default ProductoModel;