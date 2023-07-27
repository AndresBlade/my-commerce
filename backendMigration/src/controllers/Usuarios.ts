import { Request, Response } from "express";
import { tokenSign } from "../utils/handleJwt";
import UserModel  from "../models/Usuarios";
import handleHttpErrors from '../utils/handleErrors';
import {encryptPassword, comparePassword}  from '../utils/handlePassword';
import ClientModel  from "../models/Clientes";

export const registerUser = async (req:Request, res:Response) =>{ 
    const {nombre, correo, tipo_id} = req.body;
    const rawPassword = req.body.contrasenna;

    const contrasenna = await encryptPassword(rawPassword);
    const defaultImage = '../../storage/DefaultProfilePicture.png';


    //Inserta los datos en la tabla usuarios
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
    

    const data = {
        token: await tokenSign(newUser),
        Usuario: newUser,
        Cliente: newClient
    }
    res.send({data})
}

export const loginUser = async (req:Request, res:Response) =>{
    const {correo, contrasenna} = req.body;

    const userLogued = await UserModel.findOne({
        where:{
            correo:correo
        }
    });

    if(!userLogued) return res.json('IVALID USER DATA')


    const hashPassword = userLogued.get('contrasenna');
        const passwordMatch = await comparePassword(contrasenna, hashPassword);


        if(!passwordMatch){
            handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
            return
        }

        

    const data = {
        token: await tokenSign(userLogued),
        Usuario: userLogued
    }


    res.send({data})
};

export const getUsuario = async (req:Request, res:Response) =>{
    console.log(res.locals);
    res.send('oki')
}