import { ProductCategoryWrapper } from '../interfaces/ProductCategory';

export function getCategories(): Promise<ProductCategoryWrapper> {
	return fetch(`http://127.0.0.1:3000/api/categorias/getCategories`, {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<ProductCategoryWrapper>;
	});
}
