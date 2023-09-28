//Este midlleware se encarga de verificar el nivel de privilegio que tiene un administrador

import { Request, Response, NextFunction } from 'express';
import handleHttpErrors from '../utils/handleErrors';
import AdministradorModel from '../models/Administradores';

export const adminPrivilige = (privilegios:Array<string>) => async (_req:Request, res:Response, next:NextFunction) => {
    try{
        const {user = ''} = res.locals
        const userID = user.id;

        const admin = await AdministradorModel.getAdminByUserId(userID);
        if(!admin) return handleHttpErrors(res, 'ERROR_GETTIG_ADMIN', 403);
        let levelPrivigile = admin?.nivel_privilegio;
        let adminPrivilige = '';
        
        switch(levelPrivigile){
            case '0':
                adminPrivilige = 'BAJO';
                break;
            case '1':
                adminPrivilige = 'MEDIO';
                break;
            case '2':
                adminPrivilige = 'ALTO';
                break;
            default:
                adminPrivilige = 'UNKNOWN';
                break;
        }
        
        console.log(adminPrivilige);
        const checkValueRole = privilegios.some((privilegio) => adminPrivilige.includes(privilegio));

        if(!checkValueRole) return handleHttpErrors(res, 'ADMIN_DO_NOT_HAVE_ENOUGTH_PRIVILIGIE', 403);

        return next();
    }catch(e:any){
        console.log(e);
        return handleHttpErrors(res, 'ERROR_CHECKING_PRIVILIGIES', 403);
    }
}