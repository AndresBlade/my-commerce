export const deactivateUser = (token: string): Promise<string> =>
	fetch(`http://127.0.0.1:3000/api/Usuarios/desactivateUser`, {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		console.log(response);
		if (!response.ok) {
			return response.text().then(err => {
				throw new Error(err);
			});
		}
		return response.text();
	});
