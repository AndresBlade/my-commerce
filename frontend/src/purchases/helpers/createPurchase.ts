export const createPurchase = (
	token: string,
	purchase: { producto_id: number; cantidad: number }
): Promise<unknown> =>
	fetch('http://127.0.0.1:3000/api/ventas/createPurchese', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(purchase),
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<unknown>;
	});
