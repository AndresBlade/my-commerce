import {Request, Response} from 'express'
import RegionesModel from '../models/Regiones'

export async function getRegions(_req:Request, res:Response) {
    try{
        const regions = await RegionesModel.findAll();

        return res.status(200).send({regions})
    }catch(error:any){
        console.log(error);
        return res.status(500).send('ERROR_GETING_REGIONS')
    }
}

export async function getAllTiendasOfARegion(req:Request, res:Response) {
    try{
        const {regionID = ''} = req.params
        const region = parseInt(regionID.toString());

        const TiendasOfARegion = await RegionesModel.prototype.getAllTiendasOfARegion(region);

        return res.status(200).send({tiendas: TiendasOfARegion})
    }catch(error:any){
        console.log(error);
        return res.status(500).send('ERROR_GETING_TIENDAS_OF_REGION')
    }
}