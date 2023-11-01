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

        const TiendasOfARegion = await RegionesModel.getAllTiendasOfARegion(region);

        return res.status(200).send({tiendas: TiendasOfARegion})
    }catch(error:any){
        console.log(error);
        return res.status(500).send('ERROR_GETING_TIENDAS_OF_REGION')
    }
}

export async function createRegion(req:Request, res:Response) {
    try{
        const {regionName = ''} = req.body;

        if(!regionName) return res.status(400).send('ERROR_REGION_NAME_REQUIRED');

        const region = await RegionesModel.create({descripcion: regionName});

        return res.status(200).send({region})
    }catch(error:any){
        console.log(error);
        return res.status(500).send('ERROR_CREATING_REGION')
    }
}

export async function editRegion(req:Request, res:Response) {
    try{
        const {regionID = '', regionName = ''} = req.body;

        if(!regionID) return res.status(400).send('ERROR_REGION_ID_REQUIRED');
        if(!regionName) return res.status(400).send('ERROR_REGION_NAME_REQUIRED');

        await RegionesModel.update({descripcion: regionName}, {where:{id: regionID}});

        return res.status(200).send('REGION_UPDATED_SUCCESSFULLY');
    }catch(error:any){
        console.log(error);
        return res.status(500).send('ERROR_UPDATING_REGION')
    }
}