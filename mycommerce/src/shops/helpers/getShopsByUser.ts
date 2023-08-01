import { MyShopsWrapper } from '../interfaces/MyShopsWrapper';
export function getShopsByUser(
	id: number,
	token: string
): Promise<MyShopsWrapper> {
	return fetch(`http://127.0.0.1:3000/api/tienda/getTiendasByUser/${id}`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<MyShopsWrapper>;
	});
}
