import { UserDataWrapper } from '../interfaces/UserDataById';

export const getUserById = (
	id: number,
	token: string
): Promise<UserDataWrapper> =>
	fetch(`http://127.0.0.1:3000/api/user/users/${id}`, {
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<UserDataWrapper>;
	});
