import { ProductSold } from '../interfaces/ProductSold';

export function getProductsSoldByRIF(
	RIF: string,
	token: string
): Promise<ProductSold[]> {
	return fetch(
		`http://127.0.0.1:3000/api/ventas/productsSoldByStore/${RIF}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json() as Promise<ProductSold[]>;
	});
}
