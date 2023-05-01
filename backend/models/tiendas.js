const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const User = require('./user');

const Tienda = sequelize.define(
    'tiendas',
    {
        nombre: { type: DataTypes.STRING, allowNull: false,},
        RIF:{ type: DataTypes.INTEGER, allowNull: false,},
        regionId:{ type: DataTypes.STRING, allowNull: false,},
        status: {type: DataTypes.ENUM('En espera', 'Aceptada', 'Rechazada')},
        usuario_id:{type: DataTypes.INTEGER},
        
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

Tienda.findTiendaByName = function(name){
    Tienda.belongsTo(User, { 
        foreignKey: 'usuario_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        where: { nombre: name },
        include: { model: User, as: 'usuarioTienda' }
        });
};

Tienda.FindTiendas = function(){
    Tienda.belongsTo(User, { 
        foreignKey: 'usuario_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        include: { model: User, as: 'usuarioTienda' }
        });
};



module.exports = Tienda;
    