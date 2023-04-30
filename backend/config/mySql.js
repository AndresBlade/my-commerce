const Sequelize = require('sequelize');

const Connect = process.env.MYSQL_URL;
const username = process.env.MYSQL_USER;
const password  = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(Connect, username, password, {host: host, dialect:'mysql'});

const dbConnectMySql = async () => {
    try{
        await sequelize.authenticate();
        console.log('conexion a mySQL exitosa');
    }catch(e){
        console.log('Error en la conexion a la base de datos:')
        console.log(e);
    }
};


module.exports = {dbConnectMySql, sequelize};
