import { Request, Response } from "express";
import UserModel  from "../models/Usuarios";
import ClientModel  from "../models/Clientes";

export const registerUser = async (req:Request, res:Response) =>{ 
    const {nombre, correo, contrasenna, tipo_id} = req.body;
    const defaultImage = '../../storage/DefaultProfilePicture.png';

    const newUser = await UserModel.create({        
        correo,
        contrasenna,
        tipo_id
    });

    if(!newUser) return res.json('Something went wrong with User')
    
    const newClient = await ClientModel.create({
        usuario_id: newUser.id,
        nombre,
        imagen : defaultImage
    })

    if(!newClient) return res.json('Something went wrong with Client')
    
    res.send(`You have created a new user`)
}

export const defaultRoute = async (req:Request, res:Response) =>{
    res.send('you ping in the default route')
}