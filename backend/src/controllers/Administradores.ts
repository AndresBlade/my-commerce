import {Request, Response} from 'express'
import handleHttpErrors from '../utils/handleErrors';
import TiendaModel from '../models/Tiendas';

export async function getTiendasOnStandby(req:Request, res:Response){
    try{
        const { page = 0, size = 10 } = req.query;

        const pageNumber = parseInt(page.toString());
        const pageSize = parseInt(size.toString());
        
        const getTiendas = await TiendaModel.findAllTiendasWhitRegion(pageNumber, pageSize, '0');

        if(!getTiendas) return res.status(505).send('ERROR_GETTING_TIENDAS_ON_STANDBY');

        return res.send({getTiendas});
    }catch(err:any){
        console.log(err);
        handleHttpErrors(res, err.message, 500);
    }

    return res.status(200).send({message: 'Hello from Admin Controller'})
} 

