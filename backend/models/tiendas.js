const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const products = require('./producto');


const Tienda = sequelize.define(
    'tiendas',
    {
        RIF:{ type: DataTypes.INTEGER, allowNull: false, primaryKey: true,},
        nombre: { type: DataTypes.STRING, allowNull: false,},
        imagen: { type: DataTypes.STRING, allowNull: false,},
        status: {type: DataTypes.ENUM('En espera', 'Aceptada', 'Rechazada')},
        cliente_id:{type: DataTypes.INTEGER},
    },
    {
        timestamps: true,   
    }
);

//mal
Tienda.findTiendaByName = function(name){
    const User = () => require('./user');
    Tienda.belongsTo(User(), { 
        foreignKey: 'cliente_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        where: { nombre: name },
        include: { model: User(), as: 'usuarioTienda' }
        });
};

//bien
Tienda.FindTiendas = function(){
    const User = () => require('./user');
    Tienda.belongsTo(User(), { 
        foreignKey: 'cliente_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        include: { model: User(), as: 'usuarioTienda' }
        });
};

module.exports = Tienda;
    