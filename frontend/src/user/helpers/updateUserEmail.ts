interface UserUpdatedWrapper {
	userUpdated: {
		newEmail: string;
	};
}

export const updateUserEmail = (
	token: string,
	body: { newUserEmail: string }
): Promise<UserUpdatedWrapper> =>
	fetch(`http://127.0.0.1:3000/api/Usuarios/updateUserEmail`, {
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
