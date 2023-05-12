const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

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

module.exports = ventas_detalles;