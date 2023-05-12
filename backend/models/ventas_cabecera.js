const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

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

module.exports = ventas_cabecera;