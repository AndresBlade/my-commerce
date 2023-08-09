import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import RegionesInterface from './interfaces/RegionesInterface';
import TiendaModel from './Tiendas'


class RegionesModel extends Model<RegionesInterface> implements RegionesInterface{
    public id!: number;
    public descripcion!: string;

    // Metodos personalizados
    public getAllTiendasOfARegion = function(regionID:number){}
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


RegionesModel.prototype.getAllTiendasOfARegion = async function(regionID:number){
    return await RegionesModel.findAll({
        where: {id: regionID},
        attributes: [],
        include:[{
            model: TiendaModel,
            as: 'tiendas_region',
            through: {
                attributes: []
            }
        }
    ]
    })
}


export default RegionesModel;