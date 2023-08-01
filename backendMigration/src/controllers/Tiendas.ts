import { Request, Response } from "express";
import { matchedData } from "express-validator";
import handleHttpErrors from '../utils/handleErrors';
import TiendaModel  from "../models/Tiendas";
import ClienteModel from "../models/Clientes";


export const tiendaRegister = async (req:Request, res:Response) =>{ 
    try{
        //retorna solo los valores validados por el middleware
        const dataTienda = matchedData(req);
        let { RIF,  cliente_id, nombre, descripcion, imagen} = dataTienda;
        

        //validar que el cliente exista
        const client = await ClienteModel.findOne({ where: { id: cliente_id } });
        if (!client) throw new Error('El cliente con el cliente_id proporcionado no existe');
        

        const status = '0'; //En espera de aprobacion
        const saldo = 0;
        //imagen enviada por el midleware anterior (multer)
        imagen = imagen.trim(); 

        //crea la tienda
        const newTienda = await TiendaModel.create({
            RIF,
            nombre, 
            imagen,
            status,
            cliente_id, 
            descripcion,
            saldo
        })

        res.send({newTienda})
    }catch(error:any){
        console.log(error);
        handleHttpErrors(error);
    }
}