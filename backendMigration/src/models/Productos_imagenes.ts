import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import ProductImagenInterface from './interfaces/ProductImagenInterface';
import ProductoModel from './Prodcutos';


class PorductImagenModel extends Model<ProductImagenInterface> implements ProductImagenInterface{
    public id!: number;
    public producto_id!: string;
    public ruta!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados

}

PorductImagenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        producto_id: {
            type: DataTypes.INTEGER,
        },
        ruta: {
            type: DataTypes.STRING,
        }

    },
    {
        sequelize,
        tableName: "productos_imagenes",
        timestamps: true,
    }
);

PorductImagenModel.belongsTo(ProductoModel, {
    foreignKey: 'producto_id',
    as: 'product'
})

export default PorductImagenModel;