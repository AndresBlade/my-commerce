const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 

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

Producto.findAllProducts = async function(){
    const getTiendaModel = () => require('./tiendas');
    Producto.belongsTo(getTiendaModel(), {
        foreignKey: 'tienda_id',
        as: 'tienda'
    });

    return Producto.findAll({
        include: { model: getTiendaModel(), as: 'tienda' }
    });
}

Producto.FindProductsByTienda = function(id){
    const getTiendaModel = () => require('./tiendas');
    Producto.belongsTo(getTiendaModel(), {
        foreignKey: 'tienda_id',
        as: 'tienda'
    });

    return Producto.findAll({
        where: { tienda_id: id },
    });
}

Producto.findProductsByCategory = function(id){
    const getCategoriaModel = () => require('./categorias');
    Producto.belongsTo(getCategoriaModel(), {
        foreignKey: 'categoria_id',
        as: 'categoria'
    });

    return Producto.findAll({
        where: { categoria_id: id },
        include: { model: getCategoriaModel(), as: 'categoria' }
    });
}
module.exports = Producto;