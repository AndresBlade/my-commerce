const bcryptjs = require("bcrypt");


/**
 * Constraseña sin encriptar
 * @param {*} password 
 */
const encryptPassword = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10); 
    return hash;
}


/**
 * Toma como argumentos la contraseña sin encriptar y la contraseña encriptada para compararlas
 * @param {*} passwordPlain
 * @param {*} passwordHash
 */
const comparePassword = async (passwordPlain, passwordHash) => {
    const hash = await bcryptjs.compare(passwordPlain, passwordHash); 
    return hash;
}

module.exports = { encryptPassword, comparePassword };