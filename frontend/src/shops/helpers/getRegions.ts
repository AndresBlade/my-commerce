import { RegionsWrapper } from '../interfaces/ShopRegion';

export function getRegions(): Promise<RegionsWrapper> {
	return fetch(`http://127.0.0.1:3000/api/regiones/getRegions`, {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<RegionsWrapper>;
	});
}
