import { Response } from "express";

export function getClientID(res:Response){
    const {user = ''} = res.locals;
    const clientID = user.clientBelongToUser.id;
    return clientID;
}

export function getClient(res:Response){
    const {user = ''} = res.locals;
    const client = user.clientBelongToUser;
    return client;
}

export function getUserId(res:Response){
    const {user = ''} = res.locals;
    const userID = user.id;
    return userID;
}

export function getAdminID(res:Response){
    const {user = ''}= res.locals;
    const adminID = user.adminBelongToUser.id;
    return adminID;
}