import { Response, Request, NextFunction } from "express";

import { check, validationResult } from 'express-validator';

const validationResults = (req:Request, res:Response, next:NextFunction) =>{
    try{
        validationResult(req).throw();  
        return next();
    }catch (err:any) {
        res.status(403);
        res.send({erros: err.array() })
    }
}


module.exports = validationResults;
