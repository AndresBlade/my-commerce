export const updateUserPassword = (
	token: string,
	body: { oldPassword: string; newPassword: string }
): Promise<string> =>
	fetch(`http://127.0.0.1:3000/api/Usuarios/updateUserPassword`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		console.log(response);
		if (!response.ok) {
			return response
				.json()
				.then((result: { error: string }) => result.error);
		}

		console.log(response);
		return response.text();
	});
