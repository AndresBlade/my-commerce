export function getLogBody(token: string, username: string): Promise<Blob> {
	return fetch(
		`http://127.0.0.1:3000/api/bitacora/downloadUserLogFile/${username}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.blob();
	});
}
