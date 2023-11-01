import { UserData } from '../../user/interfaces/UserData';

export function getAllUserLogFiles(token: string): Promise<string[]> {
	return fetch(`http://127.0.0.1:3000/api/bitacora/getAllUserLogFiles`, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<string[]>;
	});
}
