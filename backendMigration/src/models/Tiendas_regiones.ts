import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import TiendasRegionesInterface from './interfaces/TiendasRegionesInterface';


class TiendasRegionesModel extends Model<TiendasRegionesInterface> implements TiendasRegionesInterface{
    public tienda_id!: number;
    public region_id!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
}

TiendasRegionesModel.init(
    {
        tienda_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        region_id: {
            type: DataTypes.INTEGER,
        },

    },
    {
        sequelize,
        tableName: "tiendas_regiones",
        timestamps: false,
    }
);


export default TiendasRegionesModel;