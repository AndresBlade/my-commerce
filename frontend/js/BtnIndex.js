'use strict';

const boton_creaCuentaIndex = document.querySelector('.btn-texto');
const boton_creaCuentaIndexLink = document.querySelector('.btnCrearCuenta');

if (dataJSON) {
	document.addEventListener('DOMContentLoaded', () => {
		const data = JSON.parse(localStorage.getItem('user')).data;
		const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';

		if (type === 'Cliente') {
			boton_creaCuentaIndex.textContent = 'Registra tu tienda';
			boton_creaCuentaIndexLink.href = '#';
		} else {
		}
	});
}
