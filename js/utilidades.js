'use strict';

export function mostrarMensajeError(msg) {
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
