import { ShopWrapper } from '../interfaces/ShopWrapper';

export function getShops(pageShop = 0, size = 6): Promise<ShopWrapper> {
	return fetch(
		`http://127.0.0.1:3000/api/tiendas/getTiendas/?page=${pageShop}&size=${size}`,
		{
			method: 'GET',
			// url: 'http://127.0.0.1:3000',
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<ShopWrapper>;
	});
}

// export function getProducts(pageProduct = 0): Promise<ProductWrapper> {
// 	return fetch(
// 		`http://127.0.0.1:3000/api/productos/getProducts?page=${pageProduct}`,
// 		{
// 			method: 'GET',
// 			// url: 'http://127.0.0.1:3000', daba error en react o typescript
// 		}
// 	).then(response => {
// 		if (!response.ok) {
// 			throw new Error(response.statusText);
// 		}
// 		return response.json() as Promise<ProductWrapper>;
// 	});
// }
