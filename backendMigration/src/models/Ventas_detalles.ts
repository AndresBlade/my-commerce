import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import VentasDetallesInterface from './interfaces/VentasDetallesInterface';
import ProductoModel from './Prodcutos';
import VentasCabeceraModel from './Ventas_cabecera';


class VentasDetallesModel extends Model<VentasDetallesInterface> implements VentasDetallesInterface{
    public producto_id!: number;
    public ventas_cabecera_id!: number;
    public cantidad!: number;
    public precio!: number;


    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
    static initializeAssociations(){
        //Relacion entre producto y ventas cabeceras, un producto puede tener muchas ventas cabeceras y una venta cabecera puede tener muchos productos, se usa una tabla intermedia llamada ventas_detalles
        ProductoModel.belongsToMany(VentasCabeceraModel, {through: VentasDetallesModel, foreignKey: 'producto_id',  as: 'detallesDeVenta'});
        VentasCabeceraModel.belongsToMany(ProductoModel, {through: VentasDetallesModel, foreignKey: 'ventas_cabecera_id', as:'detallesProducto'});
    }
}

VentasDetallesModel.init(
    {
        producto_id: {
            type: DataTypes.INTEGER,
        },
        ventas_cabecera_id: {
            type: DataTypes.INTEGER,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },
        precio: {
            type: DataTypes.FLOAT,
        },


    },
    {
        sequelize,
        tableName: "ventas_detalles",
        timestamps: false,
    }
);

VentasDetallesModel.initializeAssociations();


export default VentasDetallesModel;