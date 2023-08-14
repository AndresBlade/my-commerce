import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import VentasCabeceraInterface from './interfaces/VentasCabeceraInterface';
import ProductoModel from './Prodcutos';
import TiendaModel from './Tiendas';
import {returnGetPurchsesByClient} from '../models/interfaces/VentasCabeceraInterface';



class VentasCabeceraModel extends Model<VentasCabeceraInterface> implements VentasCabeceraInterface{
    public id!: number;
    public cliente_id!: number;


    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    // Metodos personalizados
    static getPurchasesByClient = async function (client_id:number): Promise<returnGetPurchsesByClient[]>{
        const purchases = await VentasCabeceraModel.findAll({
            where: { cliente_id: client_id },
            include: [
                {
                    model: ProductoModel,
                    attributes:['nombre', 'descripcion', 'precio'],
                    as:'detallesCompra',
                    include:[{
                        as: 'tiendaProducto',
                        model: TiendaModel,
                        attributes:['nombre', 'imagen', 'descripcion'],
                    }],
                    through:{
                        as: 'detallesDeVenta',
                        attributes:['cantidad', 'precio', 'createdAt',],
                    },
                }       
            ],
        });
        if(!purchases) throw new Error ('No se encontraron compras para el cliente');

        
        const transformedPurchases: returnGetPurchsesByClient[] = await purchases.map((purchase:any) => {
            return {
                ventasCabecera: {
                    id: purchase.id,
                    cliente_id: purchase.cliente_id,
                },
                detallesProducto: {
                    nombre: purchase.detallesCompra[0].nombre,
                    descripcion: purchase.detallesCompra[0].descripcion,
                    precio: parseFloat(purchase.detallesCompra[0].precio),
                    tiendaProducto: {
                        nombre: purchase.detallesCompra[0].tiendaProducto.nombre,
                        imagen: purchase.detallesCompra[0].tiendaProducto.imagen,
                        descripcion: purchase.detallesCompra[0].tiendaProducto.descripcion,
                    },
                },
                detallesVenta: {
                    cantidad: purchase.detallesCompra[0].detallesDeVenta.cantidad,
                    precio: parseFloat(purchase.detallesCompra[0].detallesDeVenta.precio),
                    total: parseFloat(purchase.detallesCompra[0].detallesDeVenta.precio) * purchase.detallesCompra[0].detallesDeVenta.cantidad,
                    createdAt: purchase.detallesCompra[0].detallesDeVenta.createdAt,
                },
            };
        });

    
        return transformedPurchases
    };
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