import { SingleShopWrapper } from '../interfaces/SingleShopWrapper';

export function getSingleShop(RIF: string): Promise<SingleShopWrapper> {
	return fetch(`http://127.0.0.1:3000/api/tienda/getTiendasByRIF/${RIF}`, {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json() as Promise<SingleShopWrapper>;
	});
}
