const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const categorias = require('./categorias');
const tiendas = require('./tiendas');


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

Producto.belongsTo(tiendas, {
    foreignKey: 'tienda_id',
    as: 'tienda',
    attributes: ['nombre', 'imagen']
});

Producto.belongsTo(categorias, {
    foreignKey: 'categoria_id',
    as: 'categoria',
});

Producto.findAllProducts = async function(){
    return Producto.findAll({
        include: { model: tiendas, 
                   as: 'tienda',
                   attributes: ['nombre', 'imagen']
                }
    });
}

Producto.FindProductsByTienda = function(id){
    return Producto.findAll({
        where: { tienda_id: id },
    });
}

Producto.findProductsByCategory = function(id){
    return Producto.findAll({
        where: { categoria_id: id },
        include: { model: tiendas, 
                    as: 'tienda',
                    attributes: ['nombre', 'imagen'] }
    });
}

Producto.findProductsByName = function(name){    
    return Producto.findAll({
        where: { nombre: name },
        include: { model: tiendas, 
            as: 'tienda',
            attributes: ['nombre', 'imagen'] }
    });
}

Producto.FindProductAndTienda = function(id){
    return Producto.findOne({
        where: { id: id },
        attributes: ['id', 'nombre'],
        include: { model: tiendas, 
            where: { id: sequelize.col('productos.tienda_id') },
            as: 'tienda',
            attributes: ['RIF'] }
        });
};

Producto.findProductByID = function(id){
    return Producto.findOne({
        where: { id: id },
        include: { model: tiendas, 
            as: 'tienda',
            attributes: ['nombre', 'imagen', 'RIF'] }
    });
}

module.exports = Producto;