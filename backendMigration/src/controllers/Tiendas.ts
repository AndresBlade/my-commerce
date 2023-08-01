import { Request, Response } from "express";
import { matchedData } from "express-validator";
import handleHttpErrors from '../utils/handleErrors';
import TiendaModel  from "../models/Tiendas";
import UserModel from "../models/Usuarios";


export const tiendaRegister = async (req:Request, res:Response) =>{ 
    try{
        const dataTienda = matchedData(req);
        let { RIF,  cliente_id, nombre, descripcion, imagen} = dataTienda;
        
        const userRequest = await UserModel.findOne({ where: { id: cliente_id } });
        const clientBelongToUser = await userRequest?.findUserAndClient(userRequest.id);
        if (!clientBelongToUser) {
            throw new Error('El cliente con el cliente_id proporcionado no existe');
        }
        const UserData = {
            ...clientBelongToUser?.dataValues
        }
        cliente_id = UserData.cliente.dataValues.id

        const status = '0'; //En espera de aprobacion
        const saldo = 0;
        imagen = imagen.trim(); 

        const newTienda = await TiendaModel.create({
            RIF,
            nombre, 
            imagen,
            status,
            cliente_id, 
            descripcion,
            saldo
        })

        if(!newTienda){
            throw new Error('Error al registrar la tienda');
        }
        
        res.send(`Nueva tienda: ${newTienda}`)
    }catch(error:any){
        console.log(error);
        handleHttpErrors(error);
    }
}