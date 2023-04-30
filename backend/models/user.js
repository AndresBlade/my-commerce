const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 
const usuarios_tipos = require('./usersType');

const User = sequelize.define(
    'usuarios',
    {
        nombre: { type: DataTypes.STRING, allowNull: false,},
        email: { type: DataTypes.STRING},
        contrasenna: { type: DataTypes.STRING, select: false,},
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

    return User.findAll({
        where: { id: id },
        include: { model: usuarios_tipos, as: 'tipo_usuario' }
        });
};

module.exports = User;
    