export const determineShopRegister = (
	RIF: number,
	token: string,
	accept: boolean
) => {
	const decisionURL = accept
		? `acceptTiendaOnStandby/${RIF}`
		: `rejectTiendaOnStandby/${RIF}`;
	return fetch(`http://127.0.0.1:3000/api/administradores/${decisionURL}`, {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}).then(response => {
		if (!response.ok) {
			return response.json().then((err: { error: string }) => {
				console.log(err.error);
				throw new Error(err.error);
			});
		}

		return response.text();
	});
};
