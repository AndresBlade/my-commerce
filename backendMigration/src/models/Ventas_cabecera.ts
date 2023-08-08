import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import VentasCabeceraInterface from './interfaces/VentasCabeceraInterface';


class VentasCabeceraModel extends Model<VentasCabeceraInterface> implements VentasCabeceraInterface{
    public id!: number;
    public cliente_id!: number;


    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados

}

VentasCabeceraModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cliente_id: {
            type: DataTypes.INTEGER,
        },

    },
    {
        sequelize,
        tableName: "ventas_cabeceras",
        timestamps: false,
    }
);


export default VentasCabeceraModel;