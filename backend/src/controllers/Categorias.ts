import { Request, Response } from 'express';
import CategoriaModel from '../models/Categorias';

export async function getCategories(_req: Request, res: Response) {
	try {
		const categories = await CategoriaModel.findAll();

		return res.status(200).send({ categories });
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_REGIONS');
	}
}



export async function createCategory(req: Request, res: Response) {
	try {
		const {categoryName = ''} = req.body;
		
		if(!categoryName) return res.send('ERROR_CATEGORY_NAME_REQUIRED');


		const newCategory = await CategoriaModel.create({
			descripcion: categoryName,
		});

		

		return res.status(200).send({newCategory});
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_REGIONS');
	}
}

export async function editCategory(req: Request, res: Response) {
	try {
		
		const {categoriaID = ''} = req.params;
		const {categoryName= ''} = req.body 
		
		if(!categoriaID) return res.send('ERROR_CATEGORY_ID_REQUIRED');
		if(!categoryName) return res.send('ERROR_CATEGORY_NAME_REQUIRED');

		await CategoriaModel.update({descripcion:categoryName}, {where:{id:categoriaID}});

		return res.status(200).send('CATEGORIA_UPDATED_SUCCESSFULLY');
	} catch (error: any) {
		console.log(error);
		return res.status(500).send('ERROR_GETING_REGIONS');
	}

}
