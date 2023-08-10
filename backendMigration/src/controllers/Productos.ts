import { Request, Response } from "express"
import ProductoModel from "../models/Prodcutos";
import PorductImagenModel from "../models/Productos_imagenes";
import { matchedData } from "express-validator";
import TiendaModel from "../models/Tiendas";

export async function CreateProduct(req:Request, res:Response) {
    try{
        const {nombre, precio, tienda_id, categoria_id, descripcion, cantidad} = matchedData(req);
        const productCreated = await ProductoModel.create({
            nombre,
            precio,
            categoria_id,
            tienda_id,
            descripcion,
            cantidad
        })
    
        if(!productCreated) return res.status(400).send('ERROR_REGISTER_PRODUCT')
    
        // crear objeto de imagenes que se van a guardar en la tabla productoImagenes
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGES');
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
    }catch(err:any){
        console.log(err)
        res.status(500).send('Error al crear el producto')
    }
}


export async function getProductByName(req:Request, res:Response) {
    try{
        const productName = req.params.productName;
        const product = await ProductoModel.prototype.findProductsByName(productName);
        res.status(200).send({products: product})
    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_PRODUCT_BY_NAME')
    }
}


export async function getAllProducts(req:Request, res:Response) {
    try{
        const { page = 0, size = 10} = req.query;

        const pageNumber = parseInt(page.toString());
        const pageSize = parseInt(size.toString());

        const products = await ProductoModel.prototype.findAllProducts(pageNumber, pageSize);
        res.status(200).send({products})

    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_ALL_PRODUCTS')
    }
}


export async function getProductByTiendaRIF(req:Request, res:Response) {
    try{
        const tiendaRIF = req.params.tiendaRif;
        //validar que el tiendaRIF no sea un string
        if(!parseInt(tiendaRIF)) return res.status(505).send('RIF_CAN_NOT_BE_A_STRING')
        const tienda_rif = parseInt(tiendaRIF);


        //validar que la tienda con l rif exista
        const tiendaVerificada = await TiendaModel.findOne({where: {RIF: tienda_rif}});  
        if(!tiendaVerificada) return res.status(500).send('RIF_NOT_FOUND')


        const data = await ProductoModel.prototype.getProductsByTiendaRIF(tienda_rif);
        res.status(200).send({ ProductosTienda: data });
    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_PRODUCTOS_BY_TIENDA_RIF')
    }
}


export async function getProductByID(req:Request, res:Response) {
    try{
        const productID = req.params.productId;
        //validar que el ProductoID no sea un string
        if(!parseInt(productID)) return res.status(505).send('ID_CAN_NOT_BE_A_STRING')

        const product_id = parseInt(productID);
        const data = await ProductoModel.prototype.findProductsByID(product_id);

        if(data === null) return res.status(200).send({products: []})

        res.status(200).send({ product: data });
    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_PRODUCTS_BY_ID')
    }
}

export async function getProductsByCategory(req:Request, res:Response) {
    try{

    }catch(err:any){
        console.log(err)
        res.status(500).send('Error al crear el producto')
    }
}
