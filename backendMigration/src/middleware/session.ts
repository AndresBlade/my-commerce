import {Express, Request, Response, NextFunction} from 'express';
import { ImplementationLocation } from 'typescript';
import handleHttpErrors from '../utils/handleErrors';
import UserModel from '../models/Usuarios'; 
import {tokenVerify} from '../utils/handleJwt';
import { Jwt, JwtPayload } from 'jsonwebtoken';


interface dataToken extends JwtPayload{
    id: number;
    tipo_id: number;
    iat: number;
    exp: number;
}

const authMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        console.log('Entra al middleware')
        if(!req.headers.authorization){
            handleHttpErrors(res, 'NEED_SESSION', 401);
        }

        let tokenAuth = req.headers.authorization;
        tokenAuth = tokenAuth?.split(' ').pop() || 'no token';

        const dataToken = await tokenVerify(tokenAuth);

        if(!dataToken){
            handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 401);
        }
        
        const {id: idUser} = dataToken as dataToken;

        const user = await UserModel.findOne({
            where: {id: idUser}
        });
        res.locals ={
            user
        }
        
        next();
    }catch(error:any){
        if (error.name === 'TokenExpiredError') {
            handleHttpErrors(res, 'SESSION_EXPIRED', 401);
        } else if (error.name === 'JsonWebTokenError'){
            handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 403);
        }else{
            handleHttpErrors(res, 'ERROR_AUTH', 403);
        }
    }
}

export {authMiddleware};