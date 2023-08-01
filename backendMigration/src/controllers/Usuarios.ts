import { Request, Response } from "express";
import { tokenSign } from "../utils/handleJwt";
import handleHttpErrors from '../utils/handleErrors';
import {encryptPassword, comparePassword}  from '../utils/handlePassword';
import UserModel  from "../models/Usuarios";
import ClientModel  from "../models/Clientes";

export const registerUser = async (req:Request, res:Response) =>{ 
    try{
        const {nombre, correo} = req.body;
        const tipo_id = 1;
        const rawPassword = req.body.contrasenna;
    
        //Encripta la contraseña
        const contrasenna = await encryptPassword(rawPassword);
        const defaultImage = '../../storage/DefaultProfilePicture.png';
    
    
        //Inserta los datos en la tabla usuarios
        const newUser = await UserModel.create({        
            correo,
            contrasenna,
            tipo_id
        });
    
    
        if(!newUser) return res.json('Something went wrong with User')
        
        //Inserta los datos en la tabla clientes
        const newClient = await ClientModel.create({
            usuario_id: newUser.id,
            nombre,
            imagen : defaultImage
        })
    
        if(!newClient) return res.json('Something went wrong with Client')
        
    
        const data = {
            token: await tokenSign(newUser),
            Usuario: newUser,
            Cliente: newClient
        }

        res.send({data})
    }catch(error:any){
        console.log(error);
        handleHttpErrors(error);
    }
}


export const loginUser = async (req:Request, res:Response) =>{
    try{

        const {correo, contrasenna} = req.body;
    
        const userLogued = await UserModel.findOne({
            where:{
                correo:correo
            }
        });
        if(!userLogued) return res.send('IVALID USER DATA')
    
        const hashPassword = userLogued.get('contrasenna');
        const passwordMatch = await comparePassword(contrasenna, hashPassword);
    
        if(!passwordMatch){
            handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
            return
        }
    
        const userAndClient = await userLogued.findUserAndClient(userLogued.id);
    
        const data = {
            token: await tokenSign(userLogued),
            Usuario: userAndClient
        }
    
        res.send({data})
    }catch(error:any){
        console.log(error);
        handleHttpErrors(error);
    }
};

export const getUsuario = async (req:Request, res:Response) =>{
    console.log(req.body.user);
    res.send('oki')
}