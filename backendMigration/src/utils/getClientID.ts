import { Response } from "express";

export function getClientID(res:Response){
    const {user = ''} = res.locals;
    const clientID = user.clientBelongToUser.id;
    return clientID;
}

export function getAdminID(res:Response){
    const {user = ''}= res.locals;
    const adminID = user.adminBelongToUser.id;
    return adminID;
}