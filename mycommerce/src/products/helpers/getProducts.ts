import { ProductWrapper } from '../interfaces/ProductWrapper';

export function getProducts(pageProduct = 0): Promise<ProductWrapper> {
	return fetch(
		`http://127.0.0.1:3000/api/productos/getProducts?page=${pageProduct}`,
		{
			method: 'GET',
			// url: 'http://127.0.0.1:3000', daba error en react o typescript
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<ProductWrapper>;
	});
}
