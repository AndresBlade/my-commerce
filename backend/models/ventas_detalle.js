const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

const Categorias = sequelize.define(
    'ventas_detalle',
    {
        producto_id: { type: DataTypes.INTEGER, allowNull: false,},
        cantidad: { type: DataTypes.INTEGER, allowNull: false,},
        precio: { type: DataTypes.FLOAT, allowNull: false,},
    },
    {
        timestamps: false, // createdAt, updatedAt
    }
)

module.exports = Categorias;