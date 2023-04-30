const {sequelize} = require('../config/mySql');
const {DataTypes} = require('sequelize'); 


const UsersType = sequelize.define(
    'usuarios_tipos',
    {
        id: { type: DataTypes.STRING, allowNull: false, primaryKey: true},
        descripcion: { type: DataTypes.STRING},
    },
    {
        timestamps: false, // createdAt, updatedAt
    }
);

module.exports = UsersType;