import { PendingRegisterShopWrapper } from '../interfaces/PendingRegisterShopWrapper';

export const getShopRegisterRequests = (
	token: string
): Promise<PendingRegisterShopWrapper> => {
	return fetch(
		`http://127.0.0.1:3000/api/administradores/getTiendasOnStandby`,
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
		return response.json() as Promise<PendingRegisterShopWrapper>;
	});
};
