import { SingleShopProductsWrapper } from '../interfaces/SingleShopProductsWrapper';
// import { ShopWrapper } from '../interfaces/ShopWrapper';

export function getSingleShopProducts(
	RIF: string
): Promise<SingleShopProductsWrapper> {
	return fetch(
		`http://127.0.0.1:3000/api/Productos/getProductsByTienda/${RIF}`,
		{
			method: 'GET',
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json() as Promise<SingleShopProductsWrapper>;
	});
}
