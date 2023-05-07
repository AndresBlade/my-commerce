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

	return true;
}

btnLogin.addEventListener('click', e => {
	e.preventDefault();

	// btnLogin.setAttribute('disabled', true);

	const user = {
		email: document.querySelector('.userForm__email').value,
		contrasenna: document.querySelector('.userForm__password').value,
	};

	const valido = validarCamposCorrectos();

	if (!valido) return;

	let error;

	btnLogin.disabled = true;
	btnLogin.classList.add('btn-login--disabled'); //desactiva el boton mientras se realiza el fetch, a fin de que el usuario no pueda realizar múltiples llamadas al servidor

	fetch('http://127.0.0.1:3000/api/user/login', {
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
		.then(
			respuesta => localStorage.setItem('user', JSON.stringify(respuesta)) //guarda el usuario en el localstorage
		)
		.then(
			respuesta =>
				(window.location.href =
					'http://127.0.0.1/e-commerce-tarea/frontend/vistas/perfil.html') //redirige al perfil
		)
		.catch(err => {
			err = JSON.parse(err);
			console.log(err);
			if (
				err.error === 'PASSWORD_NOT_MATCH' ||
				err.error === 'USER_NOT_FOUND'
			)
				//si el error es que la contraseña no coincide o el usuario no existe
				mostrarMensajeError('El correo o contraseña son incorrectos'); //
		})
		.finally(() => {
			btnLogin.disabled = false;
			btnLogin.classList.remove('btn-login--disabled'); //vuelve a activar el boton
		});
});
