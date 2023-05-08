'use strict';

export function mostrarMensajeError(msg, parentClass) {
	const cuadro = document.createElement('p');
	const parent = document.querySelector(parentClass);

	const mensajeAnterior = document.querySelector('.mensajeError');

	if (mensajeAnterior && mensajeAnterior.textContent === msg) {
		return;
	}

	if (mensajeAnterior) {
		mensajeAnterior.remove();
	}

	cuadro.classList.add('mensajeError');

	cuadro.textContent = msg;

	parent.append(cuadro);

	setTimeout(() => {
		cuadro.classList.add('mensajeError--fade');
	}, 4400);

	setTimeout(() => {
		cuadro.remove();
	}, 5000);
}
