'use strict';
const btnLogin = document.querySelector('.btn-login');

btnLogin.addEventListener('click', e => {
	e.preventDefault();

	const user = {
		nombre: document.querySelector('.userForm__name'),
		email: document.querySelector('.userForm__email'),
		contrasenna: document.querySelector('.userForm__password'),
		tipo_id: 2,
	};

	let response;

	fetch('localhost:3000/api/user/register', {
		method: 'POST',
		mode: 'same-origin',
		credentials: 'same-origin',
		body: JSON.stringify(user),
	}).then(respuesta => (response = respuesta));

	console.log(response);
});
