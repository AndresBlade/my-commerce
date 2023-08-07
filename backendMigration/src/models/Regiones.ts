import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import RegionesInterface from './interfaces/RegionesInterface';


class RegionesModel extends Model<RegionesInterface> implements RegionesInterface{
    public id!: number;
    public descripcion!: string;

    // Metodos personalizados

}


RegionesModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: "regiones",
        timestamps: false,
    }
);


export default RegionesModel;