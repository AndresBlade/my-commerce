import { mostrarMensajeError } from './utilidades.js';

document.addEventListener('DOMContentLoaded', () => {
	const data = JSON.parse(localStorage.getItem('user')).data;
	console.log(data);
	const name = data.user.nombre;
	const email = data.user.email;
	const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';

	document.querySelector('.userProfile__name').textContent = name;
	document.querySelector('.userProfile__email').textContent = email;
	document.querySelector('.userProfile__type').textContent = type;
});
