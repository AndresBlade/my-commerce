import { Request, Response } from "express";
import UserModel  from "../models/Usuarios";

export const createOneUser = async (req:Request, res:Response) =>{    
    
    res.send(`You have created a new user`)
}

export const defaultRoute = async (req:Request, res:Response) =>{
    res.send('you ping in the default route')
}