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
