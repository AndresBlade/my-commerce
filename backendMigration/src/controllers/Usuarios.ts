import { Request, Response } from "express";

export const pingHere = async (req:Request, res:Response) =>{
    console.log('Ey')
    res.send('you ping here')
}

export const defaultRoute = async (req:Request, res:Response) =>{
    res.send('you ping in the default route')
}