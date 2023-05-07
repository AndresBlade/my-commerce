'use strict';

import { mostrarMensajeError } from './utilidades.js';

const btnLogin = document.querySelector('.btn-login');

function validarCamposCorrectos() {
	const form = document.querySelector('.userForm');

	const camposRellenos = Array.from(form.children).every(input => {
		if (input.tagName !== 'INPUT') return true;
		return input.value !== '';
	});

	if (!camposRellenos)
		return mostrarMensajeError('Faltan campos por rellenar');

	if (
		document.querySelector('.userForm__password').value !==
		document.querySelector('.userForm__confirmPassword').value
	) {
		return mostrarMensajeError('Las contraseñas deben de coincidir');
	}

	const checkTerminos = document.querySelector('.termsCheckbox');

	if (!checkTerminos.checked)
		return mostrarMensajeError('Debe aceptar los términos y condiciones');

	return true;
}

btnLogin.addEventListener('click', e => {
	e.preventDefault();

	const user = {
		nombre: document.querySelector('.userForm__name').value,
		email: document.querySelector('.userForm__email').value,
		contrasenna: document.querySelector('.userForm__password').value,
		tipo_id: 1,
	};

	const valido = validarCamposCorrectos();

	if (!valido) return;

	// if (
	// 	user.contrasenna !== document.querySelector('userForm__confirmPassword')
	// ) {
	// 	return mostrarMensajeError(
	// 		'Las contraseñas a confirmar son diferentes. Inténtelo nuevamente'
	// 	);
	// }

	let response;
	let error;

	console.log(user);

	// En las peticiones fetch GET se debe de colocar la opcion url, creo que si es que se quiere especificar un puerto en específico, como el puerto 3000

	fetch('http://127.0.0.1:3000/api/user/register', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(respuesta => {
			if (!respuesta.ok)
				return respuesta.text().then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
			return respuesta.json();
		})
		.then(respuesta =>
			localStorage.setItem('user', JSON.stringify(respuesta))
		)
		.then(
			respuesta =>
				(window.location.href =
					'http://127.0.0.1/e-commerce-tarea/frontend/vistas/perfil.html')
		)
		.catch(err => console.log(JSON.parse(err)));

	// fetch('http://127.0.0.1:3000/api/user/register', {
	// 	method: 'POST',
	// 	mode: 'cors',
	// 	credentials: 'same-origin',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(user),
	// })
	// 	.then(respuesta => respuesta.json())
	// 	.then(respuesta => console.log(respuesta))
	// 	.catch(err => console.log(err));

	// fetch('http://127.0.0.1:3000/api/user/users', {
	// 	method: 'GET',
	// 	url: 'http://127.0.0.1:3000',
	// })
	// 	.then(respuesta => (response = respuesta.json()))
	// 	.then(respuesta => console.log(respuesta))
	// 	.catch(err => console.log(err));
});
