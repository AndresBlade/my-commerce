import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import TiendasRegionesInterface from './interfaces/TiendasRegionesInterface';
import TiendaModel from './Tiendas';
import RegionesModel from './Regiones';

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

TiendaModel.belongsToMany(RegionesModel,{
    through: TiendasRegionesModel
})

RegionesModel.belongsToMany(TiendaModel,{
    through: TiendasRegionesModel
})

export default TiendasRegionesModel;