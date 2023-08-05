import { Request, Response } from "express"
import ProductoModel from "../models/Prodcutos";

type productImage = {
    product_id: number,
    ruta: string
}

export function CreateProduct(req:Request, res:Response) {

    let imagenes = req.body.imagen.trim();

    const imagenObject: Array<String> = imagenes.split(' ');
    const productCreated = ProductoModel.create()

    console.log(imagenObject);

    res.send('Holiwis')
}
