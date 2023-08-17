interface UserImageUpdate {
	nuevaImagen: string;
}

export function setUserProfilePicture(
	image: File,
	token: string
): Promise<UserImageUpdate> {
	const formData: FormData = new FormData();
	formData.append('imagen', image);
	return fetch(`http://127.0.0.1:3000/api/Usuarios/updateUserImage`, {
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
		return respuesta.json() as Promise<UserImageUpdate>;
	});
}
