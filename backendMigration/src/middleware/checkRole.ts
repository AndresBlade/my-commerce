import { Request, Response, NextFunction } from "express";
import handleHttpErrors from "../utils/handleErrors";

const checkRole = (roles:Array<string>) => async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const User = res.locals.user
        let roleByUser = User.tipo_id;

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
 
        next();
    }catch(e:any){
        console.log(e);
        handleHttpErrors(res, 'ERROR_CHECK_ROLE', 403);
    }
}

export default checkRole;
