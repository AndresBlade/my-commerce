const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const Producto = require('./producto');

const ventas_detalles = sequelize.define(
    'ventas_detalle',
    {
        producto_id: { type: DataTypes.INTEGER, allowNull: false,},
        cantidad: { type: DataTypes.INTEGER, allowNull: false,},
        precio: { type: DataTypes.FLOAT, allowNull: false,},
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
)
ventas_detalles.belongsTo(Producto, {
    foreignKey: 'producto_id',
    as: 'producto',
});



module.exports = ventas_detalles;