import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import RegionesInterface from './interfaces/RegionesInterface';
import TiendaModel from './Tiendas'


class RegionesModel extends Model<RegionesInterface> implements RegionesInterface{
    public id!: number;
    public descripcion!: string;

    // Metodos personalizados
    static getAllTiendasOfARegion = async function(regionID:number):Promise<RegionesModel[]>{
        const regions = await RegionesModel.findAll({
        where: {id: regionID},
        attributes: [],
        include:[
            {
                model: TiendaModel,
                as: 'tiendasRegion',
                attributes:['RIF', 'nombre', 'imagen', 'descripcion', 'createdAt'],
                through: {
                    attributes: []
                }
            }
        ]
    });
    
    if(!regions) throw new Error('REGIONS_NOT_FOUND');

    return regions;
    }
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