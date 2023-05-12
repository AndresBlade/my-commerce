import { mostrarMensajeError } from './utilidades.js';

('use strict');

document.addEventListener('DOMContentLoaded', () => {
	const data = JSON.parse(localStorage.getItem('user')).data;

	const name = data.user.nombre;
	const email = data.user.correo;
	const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';
	const imagen = data.user.imagen || '../img/default_user_image.png';

	document.querySelector('.userProfile__name').textContent = name;
	document.querySelector('.userProfile__email').textContent = email;
	document.querySelector('.userProfile__type').textContent = type;

	if (imagen != null) document.querySelector('#profile-pic').src = imagen;
});

const inputFile = document.querySelector('#input-file');

inputFile.addEventListener('change', e => {
	const { id } = JSON.parse(localStorage.getItem('user')).data.user;
	const token = JSON.parse(localStorage.getItem('user')).data.token;
	const formData = new FormData();
	formData.append('imagen', e.target.files[0]);
	fetch(`http://127.0.0.1:3000/api/user/editarImagen/${id}`, {
		mode: 'cors',
		credentials: 'same-origin',
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
		},
		body: formData,
	})
		.then(respuesta => {
			if (!respuesta.ok) {
				console.log(respuesta);
				return respuesta.text().then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
			}
			return respuesta.json();
		})
		.then(respuesta => {
			console.log(respuesta);
		})
		.then(respuesta => {
			fetch(`http://127.0.0.1:3000/api/user/users/${id}`, {
				method: 'GET',
				url: 'http://127.0.0.1:3000',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
				.then(respuesta => {
					if (!respuesta.ok)
						return respuesta
							.text()
							.then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
					return respuesta.json();
				})
				.then(
					respuesta => {
						localStorage.setItem('user', JSON.stringify(respuesta));
						console.log(respuesta);
					}
					//guarda el usuario en el localstorage
				)
				.then(
					respuesta => window.location.reload() //redirige al perfil
				);
		})
		.catch(err => console.log(err));
});
