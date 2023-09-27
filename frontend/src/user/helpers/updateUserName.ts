interface UserUpdatedWrapper {
	clientUpdated: { id: number; nombre: string; imagen: string };
}

export const updateUserName = (
	token: string,
	body: { newUserName: string }
): Promise<UserUpdatedWrapper> =>
	fetch(`http://127.0.0.1:3000/api/Usuarios/updateUserName`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		console.log(response);
		if (!response.ok) {
			return response.text().then(err => {
				throw new Error(err);
			});
		}
		return response.json() as Promise<UserUpdatedWrapper>;
	});
