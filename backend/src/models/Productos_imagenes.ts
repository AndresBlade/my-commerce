import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import ProductImagenInterface from './interfaces/ProductImagenInterface';



class PorductImagenModel extends Model<ProductImagenInterface> implements ProductImagenInterface{
    public id!: number;
    public producto_id!: number;
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
        timestamps: false,
    }
);


export default PorductImagenModel;