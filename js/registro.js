'use strict';
const btnLogin = document.querySelector('.btn-login');

function mostrarMensajeError(msg) {
	const cuadro = document.createElement('p');
	const parent = document.querySelector('.userForm');

	const mensajeAnterior = document.querySelector('.userForm__mensajeError');

	if (mensajeAnterior && mensajeAnterior.textContent === msg) {
		return;
	}

	if (mensajeAnterior) {
		mensajeAnterior.remove();
	}

	cuadro.classList.add('userForm__mensajeError');

	cuadro.textContent = msg;

	parent.append(cuadro);

	setTimeout(() => {
		cuadro.classList.add('userForm__mensajeError--fade');
	}, 4400);

	setTimeout(() => {
		cuadro.remove();
	}, 5000);
}

function validarCamposCorrectos() {
	const form = document.querySelector('.userForm');

	const camposRellenos = Array.from(form.children).every(input => {
		if (input.tagName !== 'INPUT') return true;
		return input.value !== '';
	});

	if (!camposRellenos)
		return mostrarMensajeError('Faltan campos por rellenar');

	const checkTerminos = document.querySelector('.termsCheckbox');

	if (!checkTerminos.checked)
		return mostrarMensajeError('Debe aceptar los términos y condiciones');
}

btnLogin.addEventListener('click', e => {
	e.preventDefault();

	const user = {
		nombre: document.querySelector('.userForm__name').value,
		email: document.querySelector('.userForm__email').value,
		contrasenna: document.querySelector('.userForm__password').value,
		tipo_id: 2,
	};

	validarCamposCorrectos();

	// if (
	// 	user.contrasenna !== document.querySelector('userForm__confirmPassword')
	// ) {
	// 	return mostrarMensajeError(
	// 		'Las contraseñas a confirmar son diferentes. Inténtelo nuevamente'
	// 	);
	// }

	let response;

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
