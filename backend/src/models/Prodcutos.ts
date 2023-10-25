import {Model, DataTypes,} from 'sequelize'
import { sequelize } from '../config/db';
import ProductoModelAttributes from './interfaces/ProductoInterface';
import CategoriaModel from './Categorias';
import PorductImagenModel from './Productos_imagenes';
import TiendaModel from './Tiendas';
import { Op } from 'sequelize';


class ProductoModel extends Model<ProductoModelAttributes> implements ProductoModelAttributes{
    public id!: number;
    public nombre!: string;
    public precio!: number;
    public categoria_id!: number;
    public tienda_id!: number;
    public descripcion!: string;
    public cantidad!: number;
    public status!: string;
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

    
    static async findAllProducts(page: number, size: number): Promise<{ count: number,totalPages:number, currentPage:number,rows: ProductoModel[] }>{
        const result = await ProductoModel.findAndCountAll({
            where:{
                status:'0' //devulve solo los productos que esten activos
            },
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

    static async findAllProductsByCategoria(page: number, size: number, categoriaId:number ): Promise<{ count: number,totalPages:number, currentPage:number,rows: ProductoModel[] }>{
        const result = await ProductoModel.findAndCountAll({
            where:{
                status:'0', //devulve solo los productos que esten activos,
                categoria_id: categoriaId
            },
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


    static findProductByID = async function(productID:number):Promise<ProductoModel | null>{
        const products = ProductoModel.findOne({
            where: { id: productID },
            attributes: ['id', 'nombre', 'precio', 'descripcion','status','cantidad', 'createdAt'],
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

        if(!products) throw new Error('ERROR_GETTING_PRODUCT_BY_ID');

        return products
    };


    static getProductsByTiendaRIF = async function(tiendaRIF:number):Promise<ProductoModel[]>{
        const products = ProductoModel.findAll({
            where: { 
                    tienda_id: tiendaRIF,
                    status:'0' //devulve solo los productos que esten activos de esa Tienda
                },
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

        if(!products) throw new Error('ERROR_GETTING_PRODUCTS_BY_TIENDA_RIF');

        return products
    };


    static findProductsByName = async function(productName:string):Promise<ProductoModel[]>{
        const products = ProductoModel.findAll({
            where: { 
                nombre: {[Op.like]: `%${productName}%`},
                status:'0' //devulve solo los productos que esten activos con ese nombre
            },
            
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

        if(!products) throw new Error('ERROR_GETTING_PRODUCTS_BY_NAME');

        return products
    };

    static deleteProduct = async function(productId:number):Promise<boolean>{
        const product = await ProductoModel.findOne({
            where: { id: productId },
        });
        if(!product) throw new Error('ERROR_GETTING_PRODUCT_BY_RIF');

        await product.update({status: '1'});
        if(!product) throw new Error('ERROR_DELETING_PRODUCT');
        
        return true;
    }

    static desactivateProductsPerTienda = async function (RIF: number) {
         //este método lo que hace es desactivar todos los productos de una tienda
        try {
            //busca todos los productos que le pertenezcan a una tienda
            const productosPerTienda = await ProductoModel.getProductsByTiendaRIF(RIF);
            
            //de esos productos hace un .map para recorrer el array y ir actulizando el status de cada producto
            const productsDesactivate = await productosPerTienda.map(async (producto) => {
                const updateProductsPerTienda = await ProductoModel.update(
                    {status: '1'},
                    {where: {id: producto.id},})
                    if(!updateProductsPerTienda) throw new Error('No se pudo desactivar los productos de la tienda');

                    //si todo sale bien retorna el productoModel.update, que se va a guardar en la const productsDesactivate como un array de boleanos
                    return updateProductsPerTienda;
            })

            //hacemos uso del método .every para verificar que todos los elementos dentro del array sean true, es decir que se hayan desactivado correctamente
            if(productsDesactivate.every((product) => product)) {
                return true;
            } else {
                throw new Error('ERROR_DESACTIVATING_PRODUCTS_PER_TIENDA');
            }
        } catch(error:any){
            console.log(error)
            throw new Error('ERROR_DESACTIVATING_PRODUCTS_PER_TIENDA');   
        }
    }
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
        },
        status:{
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


export default ProductoModel;