import {Request, Response} from 'express'
import RegionesModel from '../models/Regiones'

export async function getRegions(req:Request, res:Response) {
    try{
        const regions = await RegionesModel.findAll();

        res.status(200).send({regions})
    }catch(error:any){
        console.log(error);
        res.status(500).send('ERROR_GETING_REGIONS')
    }
}

export async function getAllTiendasOfARegion(req:Request, res:Response) {
    try{
        const {regionID} = req.params
        const region = parseInt(regionID.toString());

        const TiendasOfARegion = await RegionesModel.prototype.getAllTiendasOfARegion(region);

        res.status(200).send({tiendas: TiendasOfARegion})
    }catch(error:any){
        console.log(error);
        res.status(500).send('ERROR_GETING_TIENDAS_OF_REGION')
    }
}