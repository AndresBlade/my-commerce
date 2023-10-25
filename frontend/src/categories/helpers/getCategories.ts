import { Region } from '../../shops/interfaces/ShopRegion';

export function getCategories(
	token: string
): Promise<{ categories: Region[] }> {
	return fetch(`http://127.0.0.1:3000/api/Categorias/getCategories`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<{ categories: Region[] }>;
	});
}
