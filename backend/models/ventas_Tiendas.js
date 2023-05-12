const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

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

module.exports = ventas_Tiendas;