import { ProductWrapper } from '../interfaces/ProductWrapper';

export function getProductsByCategory(
	pageProduct = 0,
	size = 4,
	categoryId: number
): Promise<ProductWrapper> {
	return fetch(
		`http://127.0.0.1:3000/api/Productos/getAllProductsByCategoria/?page=${pageProduct}&size=4&categoria_id=${categoryId}`,
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
