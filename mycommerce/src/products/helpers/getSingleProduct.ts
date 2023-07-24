import { SingleProductWrapper } from '../interfaces/SingleProductWrapper';

export function getSingleProduct(id: string): Promise<SingleProductWrapper> {
	return fetch(`http://127.0.0.1:3000/api/productos/getProductByID/${id}`, {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<SingleProductWrapper>;
	});
}
