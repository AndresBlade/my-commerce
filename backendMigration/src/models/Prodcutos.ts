import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import ProductoModelAttributes from './interfaces/ProductoInterface';
import TiendaModel from './Tiendas';


class ProductoModel extends Model<ProductoModelAttributes> implements ProductoModelAttributes{
    public id!: number;
    public nombre!: string;
    public precio!: number;
    public status!: string;
    public categoria_id!: number;
    public tienda_id!: number;
    public descripcion!: string;
    public cantidad!: number;
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
    public findProductByName = function(tiendaName:string){};

}


ProductoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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

ProductoModel.belongsTo(TiendaModel, {
    foreignKey: 'tienda_id',
    as: 'tienda'
})

export default ProductoModel;