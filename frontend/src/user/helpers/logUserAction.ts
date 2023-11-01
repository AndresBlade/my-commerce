export const logUserAction = (
	action: string,
	nombre: string,
	id: number
): Promise<unknown> =>
	fetch(`http://127.0.0.1:3000/api/bitacora/createLog`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ action, username: nombre, userId: id }),
	}).then(response => {
		if (!response.ok) {
			throw new Error('Error en la solicitud');
		}

		console.log(response);

		return response.json();
	});
