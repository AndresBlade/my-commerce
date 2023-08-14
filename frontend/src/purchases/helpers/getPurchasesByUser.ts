import { Purchase } from '../interfaces/Purchase';

export function getPurchasesByUser(
	id: number,
	token: string
): Promise<Purchase[]> {
	return fetch(
		`http://127.0.0.1:3000/api/ventas_detalle/getPurchasesByUser/${id}`,
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
		return response.json() as Promise<Purchase[]>;
	});
}
