export function createShop(formData: FormData, token: string) {
	return fetch(`http://127.0.0.1:3000/api/tienda/register`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
		},
		body: formData,
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
}
