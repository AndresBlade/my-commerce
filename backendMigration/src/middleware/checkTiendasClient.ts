import { Request, Response, NextFunction } from "express";

export default function CheckTiendasPerClient(req:Request, res:Response, next:NextFunction){
    next();
}