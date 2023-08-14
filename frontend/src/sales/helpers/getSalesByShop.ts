import { Sale } from '../interfaces/Sale';

export function getSalesByRIF(RIF: string, token: string): Promise<Sale[]> {
	return fetch(
		`http://127.0.0.1:3000/api/ventas_detalle/getSellsByTienda/${RIF}`,
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

		return response.json() as Promise<Sale[]>;
	});
}
