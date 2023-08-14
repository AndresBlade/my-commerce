import { Request, Response } from "express";
import { tokenSign } from "../utils/handleJwt";
import handleHttpErrors from '../utils/handleErrors';
import {encryptPassword, comparePassword}  from '../utils/handlePassword';
import UserModel  from "../models/Usuarios";
import ClientModel  from "../models/Clientes";
import {getClientID} from "../utils/getClientID";
import { sequelize } from "../config/db";
import AdministradorModel from "../models/Administradores";
const PUBLIC_URL = process.env['PUBLIC_URL'] || 'http://localhost:3000';


export const registerUser = async (req:Request, res:Response) =>{ 
    try{
        const {nombre, correo} = req.body;
        const rawPassword = req.body.contrasenna;

        const tipo_id = 1;
    
        //Encripta la contraseña
        const contrasenna = await encryptPassword(rawPassword);

        //define la imagen por defecto del usuario
        const defaultImage = `${PUBLIC_URL}/DefaultProfilePicture.jpeg`;
        

        //validar que el correo ingresado no sea repetido
        const user = await UserModel.findOne({ where: { correo } });
        if (user) return res.status(400).send('CORREO_ALREADY_REGISTERED');

    
        //Inserta los datos en la tabla usuarios
        const resultTransaction = await sequelize.transaction(async (t:any) => { 
            const newUser = await UserModel.create({        
                correo,
                contrasenna,
                tipo_id,
            }, {transaction: t});

            //Inserta los datos en la tabla clientes
            const newClient = await ClientModel.create({
                usuario_id: newUser.id,
                nombre,
                imagen : defaultImage
            }, {transaction: t})

            return{
                token: await tokenSign(newUser),
                userData:{
                    correo: newUser.correo,
                    tipoId: newUser.tipo_id,
                    createdAt: newUser.createdAt
                },
                clientData:{
                    id: newClient.id,
                    nombre: newClient.nombre,
                    imagen: newClient.imagen
                }
            }
        })

        return res.status(200).send({
                token: resultTransaction.token,
                userData: resultTransaction.userData,
                clientData: resultTransaction.clientData
            })
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const loginUser = async (req:Request, res:Response) =>{
    try{
        const {correo, contrasenna} = req.body;
    
        //Busca el usuario por el correo
        const userLogued = await UserModel.findOne({
            where:{
                correo:correo
            }
        });
        if(!userLogued) return res.status(500).send('EMAIL_NOT_FOUND')

        const userData = {
            correo: userLogued.correo,
            tipoId: userLogued.tipo_id,
            createdAt: userLogued.createdAt,
        }
    
        const hashPassword = userLogued.get('contrasenna');
        const passwordMatch = await comparePassword(contrasenna, hashPassword);
    
        if(!passwordMatch){
            return handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
        }


        //Respuesta condicional de acuerdo si el usuario es un cliente o un administrador
        if(userLogued.tipo_id == 1){
            //Busca el cliente asociado al usuario
            const userAndClient = await ClientModel.findClientByUserID(userLogued.id);
            return res.status(200).send({
                token: await tokenSign(userLogued),
                userData,
                clientData:{
                    id: userAndClient?.id,
                    nombre: userAndClient?.nombre,
                    imagen: userAndClient?.imagen,
                }
            })
        }else{
            //Busca el administrador asociado al usuario
            const admin = await AdministradorModel.getAdminByUserId(userLogued.id);
            return res.status(200).send({
                token: await tokenSign(userLogued),
                userData,
                adminData:{
                    id: admin?.id,
                    nombre: admin?.nombre,
                    imagen: admin?.imagen,
                } 
            })
        }
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
};

export const updateUserImage = async (req:Request, res:Response) =>{
    try{
        const client_id = getClientID(res);
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGE');
        const imagen = req.body.imagen.trim(); 

        const clientUpdate = await ClientModel.update({imagen:imagen},{where:{id:client_id}});
        if(!clientUpdate) return res.send('CANNOT_UPDATE_CLIENT_IMAGE')
    
        return res.send({nuevaImagen:imagen});
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}

export const getUsuario = async (_req:Request, res:Response) =>{
    console.log('Entraste compa')
    res.send('oki')
}

export const registerAdmin = async (req:Request, res:Response) =>{
    try{

        const {nombre, correo, nivelPrivilegio} = req.body;
        const rawPassword = req.body.contrasenna;
        const tipo_id = 2;
    
        //Encripta la contraseña
        const contrasenna = await encryptPassword(rawPassword);

        //define la imagen por defecto del usuario
        const defaultImage = `${PUBLIC_URL}/DefaultProfilePicture.jpeg`;
        

        //validar que el correo ingresado no sea repetido
        const user = await UserModel.findOne({ where: { correo } });
        if (user) return res.status(400).send('CORREO_ALREADY_REGISTERED');

        const resultTransaction = await sequelize.transaction(async (t:any) => { 
            const newUser = await UserModel.create({        
                correo,
                contrasenna,
                tipo_id
            }, {transaction:t});

            const newAdmin = await AdministradorModel.create({
                usuario_id: newUser.id,
                nombre,
                imagen : defaultImage,
                nivel_privilegio: nivelPrivilegio
            },{transaction:t});

            return{
                token: await tokenSign(newUser),
                userData:{
                    correo: newUser.correo,
                    tipoId: newUser.tipo_id
                },
                adminData:{
                    id: newAdmin.id,
                    nombre: newAdmin.nombre,
                    imagen: newAdmin.imagen,
                    nivelPrivilegio: newAdmin.nivel_privilegio
                },
            }
        })

        return res.status(200).send(resultTransaction)
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}