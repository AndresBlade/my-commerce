import { Request, Response, NextFunction } from "express";

export default function CheckTiendasPerClient(_req:Request, _res:Response, next:NextFunction){
    next();
}