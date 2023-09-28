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

        return res.send({tiendasOnStandby: getTiendas});
    }catch(err:any){
        console.log(err);
        return handleHttpErrors(res, err.message, 500);
    }

    return res.status(200).send({message: 'Hello from Admin Controller'})
} 

export async function acceptTiendaOnStandby(req:Request, res:Response){
    let {tiendaRIF = ''} = req.params;
    if(!parseInt(tiendaRIF)) return res.send('TIENDA_RIF_CAN_NOT_BE_A_STRING');
    try{
        const tienda_rif = parseInt(tiendaRIF);
        const acceptTienda = await TiendaModel.acceptTiendaOnStandby(tienda_rif);

        if(!acceptTienda) return res.status(505).send('ERROR_ACCEPTING_TIENDA_ON_STANDBY');

        return res.send('TIENDA_ACCEPTED_SUCCESSFULLY');
    }catch(err:any){
        console.log(err);
        return handleHttpErrors(res, err.message, 500);
    }
}