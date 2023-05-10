const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

const Categorias = sequelize.define(
    'regiones',
    {
        descripcion: { type: DataTypes.STRING, allowNull: false,},
    },
    {
        timestamps: false, // createdAt, updatedAt
    }
)

module.exports = Categorias;