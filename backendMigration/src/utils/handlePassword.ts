import bcryptjs from "bcryptjs"  

/**
 * Constraseña sin encriptar
 * @param {*} password 
 */
export const encryptPassword = async (passwordPlain:string) => {
    const hash = await bcryptjs.hash(passwordPlain, 10); 
    return hash;
}


/**
 * Toma como argumentos la contraseña sin encriptar y la contraseña encriptada para compararlas
 * @param {*} passwordPlain
 * @param {*} passwordHash
 */
export const comparePassword = async (passwordPlain:string, passwordHash:string) => {
    const hash = await bcryptjs.compare(passwordPlain, passwordHash); 
    return hash;
}
