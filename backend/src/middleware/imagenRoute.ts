const {handleHttpErros} = require('../utils/handleErrors');
import {Request, Response, NextFunction} from 'express';


const imageRoute = (direction:string) => (req:Request, res:Response, next:NextFunction) => {
    try{
        req.params['direction'] = direction;
        next();
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_IMAGE_ROUTE');
    }
}


export default imageRoute;
