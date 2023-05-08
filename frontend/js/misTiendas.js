'use strict';

import { mostrarMensajeError } from './utilidades.js';

const btnAgregarTienda = document.querySelector('.btnAgregarTienda');

btnAgregarTienda.addEventListener('click', e => {
	document
		.querySelector('.modalAgregarTienda')
		.classList.add('modalAgregarTienda--visible');
}); //abre el modal

const modalAgregarTienda = document.querySelector('.modalAgregarTienda');

const dialogAgregarTienda = document.querySelector(
	'.modalAgregarTienda__dialog'
);

function cerrarModal() {
	modalAgregarTienda.classList.remove('modalAgregarTienda--visible'); //cierra el modal
}

dialogAgregarTienda.addEventListener('mouseleave', e => {
	modalAgregarTienda.addEventListener('click', cerrarModal); //cierra el modal cuando se toca fuera del dialog
});

dialogAgregarTienda.addEventListener('mouseenter', e => {
	modalAgregarTienda.removeEventListener('click', cerrarModal);
});

const btnSubirImagen = document.querySelector('.formularioTienda__image');

btnSubirImagen.addEventListener('change', e => {
	const file = btnSubirImagen.files[0];
	const reader = new FileReader();

	console.log('eventoloco');
	reader.addEventListener('loadend', e => {
		console.log('readerloco');
		let image = document.querySelector('.formularioTienda__imagePreview');
		image.src = e.target.result; //obtiene la imagen del file reader
		image.classList.add('formularioTienda__imagePreview--visible');
	});

	reader.readAsDataURL(file);
});

const btnSubmitTienda = document.querySelector('.formularioTienda__submit');

function validarCamposCorrectos() {
	const form = document.querySelector('.formularioTienda');

	const inputName = document.querySelector('.formularioTienda__name');
	const inputRIF = document.querySelector('.formularioTienda__RIF');
	const inputImage = document.querySelector('.formularioTienda__image');
	const inputRegion = document.querySelector(
		'.formularioTienda__regionSelect'
	);

	const inputsText = [inputName, inputRIF, inputRegion];

	const camposRellenos = inputsText.every(input => input.value !== '');

	if (!camposRellenos)
		return mostrarMensajeError(
			'Faltan campos por rellenar',
			'.formularioTienda__errorBox'
		);

	if (inputImage.files.length === 0)
		return mostrarMensajeError(
			'Debe subir una imagen',
			'.formularioTienda__errorBox'
		);

	if (inputName.value.length < 4)
		return mostrarMensajeError(
			'El nombre debe tener mínimo 4 caracteres',
			'.formularioTienda__errorBox'
		);

	if (inputRIF.value > 2000000000)
		return mostrarMensajeError(
			'El RIF debe ser un número menor a 1.000.000.000',
			'.formularioTienda__errorBox'
		);

	return true;
}

btnSubmitTienda.addEventListener('click', e => {
	//Aquí se hace el fetch para registrar la tienda
	e.preventDefault();

	const camposCorrectos = validarCamposCorrectos();

	if (!camposCorrectos) return;

	const RIF = document.querySelector('.formularioTienda__RIF').value;
	const nombre = document.querySelector('.formularioTienda__name').value;
	const imagen = document.querySelector('.formularioTienda__image').files[0];
	const regionId = document.querySelector(
		'.formularioTienda__regionSelect'
	).value;

	const data = JSON.parse(localStorage.getItem('user')).data;

	const token = data.token;

	const cliente_id = data.user.id;

	const formData = new FormData();
	formData.append('RIF', RIF);
	formData.append('nombre', nombre);
	formData.append('regionId', regionId);
	formData.append('cliente_id', cliente_id);
	formData.append('imagen', imagen);

	console.log(formData);

	btnSubmitTienda.disabled = true;
	btnSubmitTienda.classList.add('.formularioTienda__submit--disabled');

	fetch('http://127.0.0.1:3000/api/tienda/register', {
		mode: 'cors',
		credentials: 'same-origin',
		method: 'POST',
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
			cerrarModal();
		})
		.catch(err =>
			mostrarMensajeError(
				'El RIF ya se encuentra registrado, inténtelo nuevamente',
				'.formularioTienda__errorBox'
			)
		)
		.finally(() => {
			btnSubmitTienda.disabled = false;
			btnSubmitTienda.classList.remove(
				'.formularioTienda__submit--disabled'
			);
		});
});
