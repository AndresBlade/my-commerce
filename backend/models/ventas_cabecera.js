const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

const Categorias = sequelize.define(
    'ventas_cabecera',
    {
        cliente_id: { type: DataTypes.INTEGER, allowNull: false,},
        ventas_detalles_id: { type: DataTypes.INTEGER, allowNull: false,},
    },
    {
        timestamps: false, // createdAt, updatedAt
    }
)

module.exports = Categorias;