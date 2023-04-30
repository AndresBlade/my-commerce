'use strict';
const btnLogin = document.querySelector('.btn-login');

btnLogin.addEventListener('click', e => {
	e.preventDefault();

	const user = {
		nombre: document.querySelector('.userForm__name').value,
		email: document.querySelector('.userForm__email').value,
		contrasenna: document.querySelector('.userForm__password').value,
		tipo_id: 2,
	};

	let response;

	console.log(user);

	fetch('http://127.0.0.1:3000/api/user/register', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then(respuesta => respuesta.json())
		.then(respuesta => console.log(respuesta))
		.catch(err => console.log(err));

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
