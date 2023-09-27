import { UserData } from '../../user/interfaces/UserData';

export const updateTiendaData = (
	formData: FormData,
	token: string
): Promise<string> =>
	fetch('http://127.0.0.1:3000/api/tiendas/updateTiendaData', {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
		},
		body: formData,
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.text();
	});
