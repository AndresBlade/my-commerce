import { Request, Response } from "express";
import { matchedData } from "express-validator";
import handleHttpErrors from '../utils/handleErrors';
import TiendaModel  from "../models/Tiendas";
import TiendasRegionesModel from "../models/Tiendas_regiones";
import  {sequelize}  from "../config/db";
import {getClientID} from "../utils/getClientID";


export const tiendaRegister = async (req:Request, res:Response) =>{ 
    try{
        //retorna solo los valores validados por el middleware (validatorRegisterTienda)
        const dataTienda = matchedData(req);
        let { RIF, nombre,descripcion, imagen} = dataTienda;
        const cliente_id = getClientID(res);


        //validar si el RIf de tienda Existe
        const tienda = await TiendaModel.findOne({ where: { RIF } });
        if (tienda) return res.status(400).send('Tienda ya registrada, ingrese otro RIF');


        const status = '0'; //En espera de aprobacion
        const saldo = 0;


        //imagen enviada por el midleware anterior (uploadMiddleware)
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGE');
        imagen = req.body.imagen.trim(); 


        // crea la tienda mediante una transaccion para asegurar que se cree la tiendas con sus respectivas regiones
        const resultTransaction = await sequelize.transaction(async (t:any) => {
            //Crea una nueva tienda
            const newTienda = await TiendaModel.create({
                RIF,
                nombre, 
                imagen,
                status,
                cliente_id, 
                descripcion,
                saldo
            }, {transaction: t})


            //crea objeto de los ids de las regiones y los ids de las tiendas que se van a guardar en la tabla tiendas_regiones
            const regiones_id:Array<number> = dataTienda['region_id'];
            const regionesPerTienda = regiones_id.map((region_id:number)=>{
                return{
                    tienda_id: newTienda.RIF,
                    region_id
                }
            },  {transaction: t})
            await TiendasRegionesModel.bulkCreate(regionesPerTienda, {transaction:t})


            return {
                newTienda,
                regiones_id
            };
        })

        return res.status(200).send({
            tienda: resultTransaction.newTienda,
            regionesID: resultTransaction.regiones_id  
        }) 
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const getTiendas = async (req:Request, res:Response) =>{ 
    try{
        const { page = 0, size = 10 } = req.query;

        const pageNumber = parseInt(page.toString());
        const pageSize = parseInt(size.toString());


        const tiendas = await TiendaModel.findAllTiendasWhitRegion(pageNumber, pageSize, '1');
        return res.send({tiendas});
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const getTiendaByRIF = async (req:Request, res:Response) =>{ 
    try{
        const { tiendaRIF = '' } = req.params;
        //validar que el tiendaRIF no sea un string
        if(!parseInt(tiendaRIF)) return res.status(505).send('RIF_CAN_NOT_BE_A_STRING')

        const tienda_rif = parseInt(tiendaRIF);
		const datosTienda = await TiendaModel.findTiendaByRIF(tienda_rif);
		return res.send({datosTienda});
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const getTiendaByName = async (req:Request, res:Response) =>{ 
    try{
        const { tiendaName = ''} = req.params;
		const data = await TiendaModel.findTiendaByName(tiendaName);

		return res.send({ datosTienda: data, });
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const getTiendaByClient = async (req:Request, res:Response) =>{ 
    try{
        let { clientID = '' } = req.params;

        //validar que el clientID no sea un string
        if(!parseInt(clientID)) return res.send('CLIENT_ID_CAN_NOT_BE_A_STRING');
        
        const client_id = parseInt(clientID);
		const data = await TiendaModel.findTiendaByClient(client_id);
		return res.send({ datosTienda: data });
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const deleteTienda = async (req:Request, res:Response) =>{ 
    try{
        let { tiendaRIF = '' } = req.params;
         console.log(tiendaRIF)

        //validar que el clientID no sea un string
        if(!parseInt(tiendaRIF)) return res.send('CLIENT_ID_CAN_NOT_BE_A_STRING');
        const rifDeleteTienda = parseInt(tiendaRIF);
		const tiendaDelete = await TiendaModel.deleteTienda(rifDeleteTienda);
        if(!tiendaDelete) return res.status(400).send('ERROR_DELETING_TIENDA');
        else return res.status(200).send('TIENDA_DELETED_SUCCESSFULLY');
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}


export const updateTiendaData = async (req:Request, res:Response) =>{ 
    try{        
        const dataTienda = matchedData(req);
        const {RIF, nombre,descripcion} = dataTienda;

        //recupera la imagen
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGE');
        const imagen = req.body.imagen.trim(); 

        const resultTransaction = await sequelize.transaction(async (t:any) => {
            //crea objeto de los ids de las regiones y los ids de las tiendas que se van a guardar en la tabla tiendas_regiones
            const regiones_id:Array<number> = dataTienda['region_id'];
            const regionsUpdates = await regiones_id.map((region_id: number) => {
                return {
                        region_id,
                        tienda_id: RIF,
                    }  
            })

            //actualiza la tienda directamente
            const tiendasUpdated = await TiendaModel.update({nombre:nombre, descripcion:descripcion, imagen:imagen}, {where:{RIF:RIF}});

            //elimina los registros anteriores asosiacidos a la tienda en la tabla tiendas_regiones
            await TiendasRegionesModel.destroy({where:{tienda_id:RIF}});

            //crea los nuevos registros en la tabla tiendas_regiones con el array de objetos anteriormente creado 
            const regionesUpdated = await TiendasRegionesModel.bulkCreate(regionsUpdates, {transaction:t});
            
            if(!tiendasUpdated || !regionesUpdated) return res.send('CANNOT_UPDATE_TIENDA_DATA')

            return true;
        })

        if(!resultTransaction) return res.send('CANNOT_UPDATE_TIENDA_DATA')
        
        return res.status(200).send('TIENDA_DATA_UPDATED_SUCCESSFULLY');
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error); 
    }
}

export const updateTiendaImagen = async (req:Request, res:Response) =>{ 
    try{
        const {tiendaRIF} = req.params;
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGE');
        const imagen = req.body.imagen.trim(); 

        const tiendasUpdated = await TiendaModel.update({imagen:imagen}, {where:{RIF:tiendaRIF}});
        if(!tiendasUpdated) return res.send('CANNOT_UPDATE_CLIENT_IMAGE')
    
        return res.status(200).send({nuevaImagen:imagen});
    }catch(error:any){
        console.log(error);
        return handleHttpErrors(error);
    }
}