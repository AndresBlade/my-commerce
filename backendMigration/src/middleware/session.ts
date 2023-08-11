import {Express, Request, Response, NextFunction} from 'express';
import { ImplementationLocation } from 'typescript';
import handleHttpErrors from '../utils/handleErrors';
import UserModel from '../models/Usuarios'; 
import {tokenVerify} from '../utils/handleJwt';
import { Jwt, JwtPayload } from 'jsonwebtoken';
import ClienteModel from '../models/Clientes';
import AdministradorModel from '../models/Administradores';


interface dataToken extends JwtPayload{
    id: number;
    tipo_id: number;
    iat: number;
    exp: number;
}

const authMiddleware = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        if(!req.headers.authorization){
            return handleHttpErrors(res, 'NEED_SESSION', 401);
        }

        let tokenAuth = req.headers.authorization;
        tokenAuth = tokenAuth?.split(' ').pop() || 'no token';

        const dataToken = await tokenVerify(tokenAuth);

        if(!dataToken){
            handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 401);
        }
        const {id: userID, tipo_id: tipoID} = dataToken as dataToken;


        //consigue el usuario con el id perteneciente
        const user = await UserModel.findOne({ where: {id: userID} });

        if(user?.tipo_id === 1){
            console.log('entras en el if')
            //consigue el cliente que pertenece al usuario
            const clientBelongToUser = await ClienteModel.findClientByUserID(userID);

            const userData = {
                ...user?.dataValues,
                clientBelongToUser
            }

            res.locals.user = userData;
            next();
        }else if(user?.tipo_id === 2){
            const adminBelongToUser = await AdministradorModel.getAdminByUserId(userID);
            const userData = {
                ...user?.dataValues,
                adminBelongToUser
            }
            res.locals.user = user;
            next();
        }
        
        
    }catch(error:any){
        if (error.name === 'TokenExpiredError') {
            handleHttpErrors(res, 'SESSION_EXPIRED', 401);
        } else if (error.name === 'JsonWebTokenError'){
            handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 403);
        }else{
            console.log(error);
            handleHttpErrors(res, 'ERROR_AUTH', 403);
        }
    }
}

export {authMiddleware};