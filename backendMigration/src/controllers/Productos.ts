import { Request, Response } from "express"
import ProductoModel from "../models/Prodcutos";
import PorductImagenModel from "../models/Productos_imagenes";
import { matchedData } from "express-validator";

export async function CreateProduct(req:Request, res:Response) {

    const {nombre, precio, tienda_id, categoria_id, descripcion, cantidad} = matchedData(req);
    const productCreated = await ProductoModel.create({
        nombre,
        precio,
        categoria_id,
        tienda_id,
        descripcion,
        cantidad
    }
    )
    
    if(!productCreated) return res.status(400).send('No se pudo crear el producto')

    // crear objeto de imagenes que se van a guardar en la tabla productoImagenes
    let imagenesReq = req.body.imagen.trim();
    const imagenObject: Array<string> = imagenesReq.split(' ');
    const imagenes = imagenObject.map((imagen: string) => {
        return {
            producto_id: productCreated.id,
            ruta: imagen
        }
    });
    PorductImagenModel.bulkCreate(imagenes)

    res.status(200).send({
        productCreated: productCreated,
        productImagenes: imagenObject
    })
}
