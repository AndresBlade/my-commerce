import { NextFunction, Request, Response } from "express";

export function getClientID(res:Response){
    const User = res.locals.user;
    const clientID = User.clientBelongToUser.id;
    return clientID;
}

export function getAdminID(res:Response){
    const User = res.locals.user;
    const adminID = User.adminBelongToUser.id;
    return adminID;
}