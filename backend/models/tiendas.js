const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
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

Tienda.belongsTo(User, { 
    foreignKey: 'cliente_id',
    as: 'usuarioTienda'
});


Tienda.findTiendaByName = function(name){
    return Tienda.findAll({
        where: { nombre: name },
        include: { model: User(), as: 'usuarioTienda' }
        });
};

Tienda.FindTiendas = function(){
    return Tienda.findAll({
        include: { model: User, as: 'usuarioTienda' }
        });
};

Tienda.FindTiendasByUser = function(id){
    return Tienda.findAll({
        where: { cliente_id: id },
    });
}

module.exports = Tienda;
    