import { MyShopsWrapper } from '../interfaces/MyShopsWrapper';
export function getShopsByUser(id: number): Promise<MyShopsWrapper> {
	return fetch(`http://127.0.0.1:3000/api/Tiendas/getTiendaByClient/${id}`, {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<MyShopsWrapper>;
	});
}
