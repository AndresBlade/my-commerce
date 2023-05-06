const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const Tienda = require('./tiendas');

const Producto = sequelize.define(
    'productos',
    {   
        nombre: { type: DataTypes.STRING, allowNull: false,},
        precio:{ type: DataTypes.FLOAT, allowNull: false,},
        categoria_id:{ type: DataTypes.INTEGER, allowNull: false,},
        tienda_id:{ type: DataTypes.INTEGER, allowNull: false,},
        descripcion :{ type: DataTypes.STRING, allowNull: false,},
        imagenes:{ type: DataTypes.STRING, allowNull: false,},
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

module.exports = Producto;