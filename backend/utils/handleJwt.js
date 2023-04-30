const jsonwebtoken = require('jsonwebtoken');
const SECRET_KEY  = process.env.JWT_SECRET;

/**
 * Debes de pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) =>{
    const token = await jsonwebtoken.sign(
        {
            id:user.id,
            tipo_id:user.role,
            
        },
        SECRET_KEY, 
        {
            expiresIn: '2h'
        }
    );

    return token;
}

/**
 * Pasas como parametro el token de sesion (El jwt)
 * @param {*} tokenJWT 
 */
const tokenVerify = async (tokenJWT) => {
    try{
        const data = await jsonwebtoken.verify(tokenJWT, SECRET_KEY);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}


module.exports = { tokenSign, tokenVerify };