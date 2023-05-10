'use strict';
import { mostrarMensajeError } from './utilidades.js';

class UI {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('user')).data;
		// this.tiendas = this.data.tiendas;
		// this.region = this.data.regiones;
		// this.tienda = {
		// 	id: this.tiendas.length + 1,
		// 	nombre: this.nombre,
		// 	RIF: this.RIF,
		// 	imagen: this.imagen,
		// 	regionId: this.regionId,
		// };
		// this.tiendas.push(this.tienda);
		// this.data.tiendas = this.tiendas;
		this.mostrarMisTiendas();
	}

	#tiendas = [];

	get btnAgregarTienda() {
		return document.querySelector('.btnAgregarTienda');
	}

	get modalAgregarTienda() {
		return document.querySelector('.modalAgregarTienda');
	}

	get dialogAgregarTienda() {
		return document.querySelector('.modalAgregarTienda__dialog');
	}

	get btnSubirImagen() {
		return document.querySelector('.formularioTienda__image');
	}

	get btnSubmitTienda() {
		return document.querySelector('.formularioTienda__submit');
	}

	get formularioTienda() {
		return document.querySelector('.formularioTienda');
	}

	get inputName() {
		return document.querySelector('.formularioTienda__name');
	}

	get inputRIF() {
		return document.querySelector('.formularioTienda__RIF');
	}

	get inputImage() {
		return document.querySelector('.formularioTienda__image');
	}

	get inputRegion() {
		return document.querySelector('.formularioTienda__regionSelect');
	}

	get inputImagePreview() {
		return document.querySelector('.formularioTienda__imagePreview');
	}

	validarCamposCorrectos() {
		const inputName = this.inputName;
		const inputRIF = this.inputRIF;
		const inputImage = this.inputImage;
		const inputRegion = this.inputRegion;

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

	#obtenerMisTiendas() {
		const { id } = this.data.user;
		const { token } = this.data;

		return fetch(
			`http://127.0.0.1:3000/api/tienda/getTiendasByUser/${id}`,
			{
				method: 'GET',
				url: 'http://127.0.0.1:3000',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
			.then(respuesta => {
				if (!respuesta.ok)
					return respuesta
						.text()
						.then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
				return respuesta.json();
			})
			.then(respuesta => {
				console.log(respuesta);
				this.#tiendas = respuesta.data;
			})
			.catch(err => console.log(err));
	}

	mostrarMisTiendas() {
		this.#obtenerMisTiendas().then(respuesta => {
			console.log(this.#tiendas);
			const misTiendas = document.querySelector('.misTiendas__grid');

			const regexReemplazoRuta = /:\d\d\d\d/;
			this.#tiendas.forEach(tienda => {
				let { nombre, RIF, imagen, createdAt: fechaCreacion } = tienda;

				// let [rutaImagen, nombreImagen] =
				// 	imagen.split(regexReemplazoRuta);

				// imagen = imagen.replace(regexReemplazoRuta, '');

				console.log(imagen);

				fechaCreacion = fechaCreacion.split('T')[0];

				const tiendaHTML = document.createElement('a');
				tiendaHTML.href = `${window.location.href}/../miTienda.html`;
				tiendaHTML.classList.add('misTiendas__tienda');
				tiendaHTML.addEventListener('click', e => irATienda(e, tienda));

				const nombreHTML = document.createElement('h3');
				nombreHTML.textContent = nombre;
				nombreHTML.classList.add('misTiendas__nombre');

				const RIFHTML = document.createElement('p');
				RIFHTML.innerHTML = `<span class="misTiendas__title">RIF</span>: ${RIF}`;

				const imagenHTML = document.createElement('img');
				imagenHTML.src = imagen;

				imagenHTML.classList.add('misTiendas__img');

				const fechaHTML = document.createElement('p');
				fechaHTML.innerHTML = `<span class="misTiendas__title">Fecha de creación</span>: ${fechaCreacion}`;

				tiendaHTML.append(nombreHTML, RIFHTML, imagenHTML, fechaHTML);
				misTiendas.append(tiendaHTML);
			});
		});
	}
}

function irATienda(e, tienda) {
	e.preventDefault();

	sessionStorage.setItem('tienda', JSON.stringify(tienda));

	window.location.href = `${window.location.href}/../miTienda.html`;
}

const ui = new UI();

const btnAgregarTienda = ui.btnAgregarTienda;

const modalAgregarTienda = ui.modalAgregarTienda;

const dialogAgregarTienda = ui.dialogAgregarTienda;

const btnSubirImagen = ui.btnSubirImagen;

const btnSubmitTienda = ui.btnSubmitTienda;

btnAgregarTienda.addEventListener('click', e => {
	modalAgregarTienda.classList.add('modalAgregarTienda--visible');
}); //abre el modal

function cerrarModal() {
	modalAgregarTienda.classList.remove('modalAgregarTienda--visible'); //cierra el modal
}

dialogAgregarTienda.addEventListener('mouseleave', e => {
	modalAgregarTienda.addEventListener('click', cerrarModal); //cierra el modal cuando se toca fuera del dialog
});

dialogAgregarTienda.addEventListener('mouseenter', e => {
	modalAgregarTienda.removeEventListener('click', cerrarModal);
});

btnSubirImagen.addEventListener('change', e => {
	const file = btnSubirImagen.files[0];
	const reader = new FileReader();

	console.log('eventoloco');
	reader.addEventListener('loadend', e => {
		console.log('readerloco');
		let image = ui.inputImagePreview;
		image.src = e.target.result; //obtiene la imagen del file reader
		image.classList.add('formularioTienda__imagePreview--visible');
	});

	reader.readAsDataURL(file);
});

btnSubmitTienda.addEventListener('click', e => {
	//Aquí se hace el fetch para registrar la tienda
	e.preventDefault();

	const camposCorrectos = ui.validarCamposCorrectos();

	if (!camposCorrectos) return;

	const RIF = ui.inputRIF.value;
	const nombre = ui.inputName.value;
	const imagen = ui.inputImage.files[0];
	const regionId = ui.inputRegion.value;

	const data = ui.data;

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
			console.log(respuesta);
			window.location.reload();
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
