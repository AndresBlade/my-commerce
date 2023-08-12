import { Request, Response, NextFunction } from "express";
import handleHttpErrors from "../utils/handleErrors";

const checkRole = (roles:Array<string>) => async (_req:Request, res:Response, next:NextFunction) =>{
    try{
        const {user} = res.locals
        let roleByUser = user.tipo_id;

        switch(roleByUser){
            case 1:
                roleByUser = 'CLIENTE';
                break;
            case 2:
                roleByUser = 'ADMINISTRADOR';
                break;
            default:
                roleByUser = 'UNKNOWN';
                break;
        }

        const checkValueRole = roles.some((rolSingle) => roleByUser.includes(rolSingle));

        
        if(!checkValueRole){
            return handleHttpErrors(res, 'USER_DONT_HAVE_PERMISSIONS', 403);
        }
 
        return next();
    }catch(e:any){
        console.log(e);
        return handleHttpErrors(res, 'ERROR_CHECK_ROLE', 403);
    }
}

export default checkRole;
