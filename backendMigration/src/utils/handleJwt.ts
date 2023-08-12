import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';
import UserModelAttributes from '../models/interfaces/UserInterface';
const SECRET_KEY = process.env['JWT_SECRET'] || 'LlaveUltrasecretaDeMyCommerce';


/**
 * Debes de pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user:UserModelAttributes) =>{
    const token = await jsonwebtoken.sign(
        {
            id:user.id,
            tipo_id:user.tipo_id,
        },
        SECRET_KEY, 
        {
            expiresIn: '1h'
        }
    );

    return token;
}

/**
 * Pasas como parametro el token de sesion (El jwt)
 * @param {*} tokenJWT 
 */
const tokenVerify = async (tokenJWT:string) => {
    try{
        const userData = jsonwebtoken.verify(tokenJWT, SECRET_KEY);
        return userData;
    }catch(error: any){
        error = error as JsonWebTokenError;
        if (error.name === 'TokenExpiredError') {
            throw{
                name: 'TokenExpiredError',
                message: 'Token expired'
            }
        }else if (error.name === 'JsonWebTokenError'){
            throw{
                name: 'JsonWebTokenError',
                message: 'Invalid token'
            }
        }        
        return
    }
}

export { tokenSign, tokenVerify };