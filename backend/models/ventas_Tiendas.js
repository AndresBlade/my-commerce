const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const Producto = require('./producto');
const ventas_cabecera = require('./ventas_cabecera');
const ventas_detalles = require('./ventas_detalle');
const User = require('./user');

const ventas_Tiendas = sequelize.define(
    'ventas_Tiendas',
    {
        tienda_id: { type: DataTypes.INTEGER, allowNull: false,},
        venta_cabecera_id: { type: DataTypes.INTEGER, allowNull: false,},
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
)
ventas_Tiendas.belongsTo(ventas_cabecera, {
    foreignKey: 'venta_cabecera_id',
    as: 'venta_cabecera',
});


ventas_Tiendas.findSellsByTienda = async function(RIF){
    return ventas_Tiendas.findAll({
        where: { tienda_id: RIF },
        attributes: ['createdAt'],
        include:{
                    model: ventas_cabecera, as: 'venta_cabecera', 
                    include: [
                        {
                            model: ventas_detalles,
                            as: 'venta_detalle', 
                            attributes:['precio', 'cantidad'],
                            include: {
                                model: Producto,
                                as: 'producto',
                                attributes: ['nombre']
                            }
                        },
                        {
                            model: User,
                            as: 'cliente',
                            attributes: ['nombre']
                        }
                    ],
                    attributes:['cliente_id','ventas_detalles_id'],
                },
    });                          
}

module.exports = ventas_Tiendas;