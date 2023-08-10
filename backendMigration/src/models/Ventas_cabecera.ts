import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import VentasCabeceraInterface from './interfaces/VentasCabeceraInterface';
import ProductoModel from './Prodcutos';
import TiendaModel from './Tiendas';


class VentasCabeceraModel extends Model<VentasCabeceraInterface> implements VentasCabeceraInterface{
    public id!: number;
    public cliente_id!: number;


    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
    public getPurchsesByClient = function (client_id:number){};
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

VentasCabeceraModel.prototype.getPurchsesByClient = async function (client_id:number){
    return await VentasCabeceraModel.findAll({
        where: { cliente_id: client_id },
        include: [
            {
                model: ProductoModel,
                attributes:['nombre', 'descripcion', 'precio'],
                as:'detalles_producto',
                include:[{
                    as: 'tienda_producto',
                    model: TiendaModel,
                    attributes:['nombre', 'imagen', 'descripcion'],
                }],
                through:{
                    as: 'detalles_de_venta',
                    attributes:['cantidad', 'precio', 'createdAt',]
                },
            }       
        ]
    });
}

export default VentasCabeceraModel;