export function setUserProfilePicture(image: File, id: number, token: string) {
	const formData: FormData = new FormData();
	formData.append('imagen', image);
	return fetch(`http://127.0.0.1:3000/api/user/editarImagen/${id}`, {
		mode: 'cors',
		credentials: 'same-origin',
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
		},
		body: formData,
	}).then(respuesta => {
		if (!respuesta.ok) {
			console.log(respuesta);
			return respuesta.text().then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
		}
		return respuesta.json();
	});
}
