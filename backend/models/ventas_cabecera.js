const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const ventasDetalles = require('./ventas_detalle');
const Producto = require('./producto');
const User = require('./user');

const ventas_cabecera = sequelize.define(
    'ventas_cabecera',
    {
        cliente_id: { type: DataTypes.INTEGER, allowNull: false,},
        ventas_detalles_id: { type: DataTypes.INTEGER, allowNull: false,},
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
)
ventas_cabecera.belongsTo(ventasDetalles, {
    foreignKey: 'ventas_detalles_id',
    as: 'venta_detalle',
});

ventas_cabecera.belongsTo(User, {
    foreignKey: 'cliente_id', 
    as: 'cliente',
})

ventas_cabecera.findPurchasesByUser = async function(id){
    return ventas_cabecera.findAll({
        where: { cliente_id: id },
        attributes: ['cliente_id', 'createdAt'],
        include: { model: ventasDetalles, as: 'venta_detalle',
                   attributes: ['cantidad', 'precio'],
                include: { model: Producto, as: 'producto', attributes: ['nombre']}},
    });                          
}

module.exports = ventas_cabecera;