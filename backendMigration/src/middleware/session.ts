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

        //consigue el usuario 
        const user = await UserModel.findOne({ where: {id: idUser} });
        //consigue el cliente que pertenece al usuario
        const clientBelongToUser = await user?.findUserAndClient(user.id);


        const userData = {
            ...user?.dataValues,
            ...clientBelongToUser?.dataValues.cliente.dataValues
        }
        
        req.body.user = userData;
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