import {Request, Response, NextFunction} from 'express';
import handleHttpErrors from '../utils/handleErrors';
import UserModel from '../models/Usuarios'; 
import {tokenVerify} from '../utils/handleJwt';
import { JwtPayload } from 'jsonwebtoken';
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
        const {id: userID} = dataToken as dataToken;


        //consigue el usuario con el id perteneciente
        const user = await UserModel.findOne({ where: {id: userID} });

        if(user?.tipo_id === 1){
            //consigue el cliente que pertenece al usuario
            const clientBelongToUser = await ClienteModel.findClientByUserID(userID);

            const userData = {
                ...user?.dataValues,
                clientBelongToUser,
                dataToken
            }

            res.locals['user'] = userData;
            return next();
        }else if(user?.tipo_id === 2){
            const adminBelongToUser = await AdministradorModel.getAdminByUserId(userID);
            const userData = {
                ...user?.dataValues,
                adminBelongToUser,
                dataToken
            }
            res.locals['user'] = userData;
            return next();
        }
        
        
    }catch(error:any){
        if (error.name === 'TokenExpiredError') {
            return handleHttpErrors(res, 'SESSION_EXPIRED', 401);
        } else if (error.name === 'JsonWebTokenError'){
            return handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 403);
        }else{
            console.log(error);
            return handleHttpErrors(res, 'ERROR_AUTH', 403);
        }
    }
}

export {authMiddleware};