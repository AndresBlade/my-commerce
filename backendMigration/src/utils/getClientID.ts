import { NextFunction, Request, Response } from "express";

export default function getClientID(res:Response){
    const User = res.locals.user;
    const clientData = User.clientBelongToUser.dataValues.clientData.dataValues;
    return clientData.id;
}