import { Request, Response } from "express";
import { tokenSign } from "../utils/handleJwt";
import handleHttpErrors from '../utils/handleErrors';
import {encryptPassword, comparePassword}  from '../utils/handlePassword';
import UserModel  from "../models/Usuarios";
import ClientModel  from "../models/Clientes";
import getClientID from "../utils/getClientID";
import { sequelize } from "../config/db";
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';


export const registerUser = async (req:Request, res:Response) =>{ 
    try{
        const {nombre, correo} = req.body;
        const tipo_id = 1;
        const rawPassword = req.body.contrasenna;
    
        //Encripta la contraseña
        const contrasenna = await encryptPassword(rawPassword);

        //define la imagen por defecto del usuario
        const defaultImage = `${PUBLIC_URL}/DefaultProfilePicture.jpeg`;
    
    
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
            return handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
        }
    
        const userAndClient = await ClientModel.prototype.findClientAndUser(userLogued.id);
    
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

export const updateUserImage = async (req:Request, res:Response) =>{
    try{
        const client_id = getClientID(res);
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGE');
        const imagen = req.body.imagen.trim(); 

        const clientUpdate = await ClientModel.update({imagen:imagen},{where:{id:client_id}});
        if(!clientUpdate) return res.send('CANNOT_UPDATE_CLIENT_IMAGE')
    
        res.send({nuevaImagen:imagen});
    }catch(error:any){
        console.log(error);
        handleHttpErrors(error);
    }
}

export const getUsuario = async (req:Request, res:Response) =>{
    console.log('Entraste compa')
    res.send('oki')
}