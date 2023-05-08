const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const products = require('./producto');
const User = require('./user');

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

Tienda.findTiendaByName = function(name){
    Tienda.belongsTo(User, { 
        foreignKey: 'cliente_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        where: { nombre: name },
        include: { model: User, as: 'usuarioTienda' }
        });
};

User.FindProductsByTienda = function(id){
    products.belongsTo(Tienda, {
        foreignKey: 'tienda_id',
        as: 'tienda'
    });

    return products.findAll({
        where: { tienda_id: id },
    });
}

Tienda.FindTiendas = function(){
    Tienda.belongsTo(User, { 
        foreignKey: 'usuario_id',
        as: 'usuarioTienda' });

    return Tienda.findAll({
        include: { model: User, as: 'usuarioTienda' }
        });
};



module.exports = Tienda;
    