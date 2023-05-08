const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const tiendas = require('./tiendas');
const usuarios_tipos = require('./usersType');

const User = sequelize.define(
    'usuarios',
    {
        nombre: { type: DataTypes.STRING, allowNull: false,},
        correo: { type: DataTypes.STRING},
        contrasenna: { type: DataTypes.STRING, select: false,},
        imagen: { type: DataTypes.STRING},
        tipo_id: { type: DataTypes.INTEGER },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

User.findUserById = function(id){
    User.belongsTo(usuarios_tipos, { 
        foreignKey: 'tipo_id',
        as: 'tipo_usuario' });

    return User.findOne({
        where: { id: id },
        include: { model: usuarios_tipos, as: 'tipo_usuario' }
        });
};

User.FindTiendasByUser = function(id){
    tiendas.belongsTo(User, {
        foreignKey: 'cliente_id',
        as: 'usuarioTienda'
    });

    return tiendas.findAll({
        where: { cliente_id: id },
    });
}

User.updateUserType = function(id, tipo_id){
    return User.update({ tipo_id: tipo_id }, { where: { id: id }});
}

module.exports = User;
    