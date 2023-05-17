'use strict';

import { getCategories } from './api/getCategories.js';
import { mostrarMensajeError } from './utilidades.js';

class UI {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('user')).data;
	}

	#categorias;

	get perfil() {
		document.querySelector('.misTiendas__perfilTienda');
	}

	get nombreHTML() {
		return document.querySelector('.perfilTienda__nombre');
	}

	get RIFHTML() {
		return document.querySelector('.perfilTienda__RIF');
	}

	get fechaCreacionHTML() {
		return document.querySelector('.perfilTienda__fechaCreacion');
	}

	get imagenHTML() {
		return document.querySelector('.perfilTienda__imagen');
	}

	get btnAgregarProducto() {
		return document.querySelector('.btnAgregar');
	}

	get modalAgregarProducto() {
		return document.querySelector('.modal');
	}

	get dialogAgregarProducto() {
		return document.querySelector('.modal__dialog');
	}

	get btnSubirImagen() {
		return document.querySelector('.formModal__image');
	}

	get btnSubmitProducto() {
		return document.querySelector('.formModal__submit');
	}

	get formModal() {
		return document.querySelector('.formModal');
	}

	get inputName() {
		return document.querySelector('#name');
	}
	get inputImage() {
		return document.querySelector('.formModal__image');
	}
	get inputPrice() {
		return document.querySelector('#price');
	}

	get inputCategoria() {
		return document.querySelector('#category');
	}

	get inputDescription() {
		return document.querySelector('#description');
	}

	get inputImagePreview() {
		return document.querySelector('.formModal__imagePreview');
	}

	rellenarPerfil() {
		const { nombre, RIF, imagen, createdAt } = JSON.parse(
			sessionStorage.getItem('tienda')
		);

		const nombreHTML = this.nombreHTML;
		const RIFHTML = this.RIFHTML;
		const fechaCreacionHTML = this.fechaCreacionHTML;
		const imagenHTML = this.imagenHTML;

		imagenHTML.addEventListener('click', () => {
			imagenHTML.classList.toggle('perfilTienda__imagen--expanded');
		});

		nombreHTML.textContent = nombre;
		RIFHTML.innerHTML = `<span class="perfilTienda__RIF">RIF</span>: ${RIF}`;
		fechaCreacionHTML.innerHTML = `<span class="perfilTienda__RIF">Fecha de creación</span>: ${
			createdAt.split('T')[0]
		}`;
		imagenHTML.src = imagen;
	}

	validarCamposCorrectos() {
		const inputName = this.inputName;
		const inputImage = this.inputImage;
		const inputCategoria = this.inputCategoria;
		const inputPrice = this.inputPrice;
		const inputDescription = this.inputDescription;

		const inputsText = [inputName, inputPrice, inputDescription];

		const camposRellenos = inputsText.every(input => input.value !== '');

		if (!camposRellenos)
			return mostrarMensajeError(
				'Faltan campos por rellenar',
				'.formModal__errorBox'
			);

		if (inputImage.files.length === 0)
			return mostrarMensajeError(
				'Debe subir una imagen',
				'.formModal__errorBox'
			);

		if (inputName.value.length < 4)
			return mostrarMensajeError(
				'El nombre debe tener mínimo 4 caracteres',
				'.formModal__errorBox'
			);

		return true;
	}

	crearImagePreview(src) {
		const inputImagePreview = document.createElement('img');
		inputImagePreview.classList.add('formModal__imagePreview');
		inputImagePreview.src = src;
		return inputImagePreview;
	}

	async #obtenerProductos() {
		const idTienda = JSON.parse(sessionStorage.getItem('tienda')).RIF;
		const { token } = JSON.parse(localStorage.getItem('user')).data;

		return await fetch(
			`http://127.0.0.1:3000/api/productos/getProductsByTienda/${idTienda}`,
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
			.catch(err => console.log(err));
	}

	mostrarCategorias() {
		getCategories()
			.then(resultado => {
				console.log(resultado);
				const selectCategorias = document.querySelector('#category');

				this.#categorias = resultado;

				this.#categorias.forEach(categoria => {
					const option = document.createElement('option');
					option.value = categoria.id;
					option.textContent = categoria.descripcion;
					option.classList.add('formModal__option');
					selectCategorias.append(option);
				});
			})
			.then(() => this.mostrarProductos());
	}

	mostrarProductos() {
		this.#obtenerProductos()
			.then(respuesta => respuesta.tiendaProducts)
			.then(productos => {
				console.log(productos);

				const productosContenedor =
					document.querySelector('.misTiendas__grid');

				productos.forEach(producto => {
					console.log(producto.imagenes);
					const productoHTML = document.createElement('a');
					productoHTML.classList.add('producto_tienda_perfil');

					const nombreProductoHTML = document.createElement('h4');
					nombreProductoHTML.classList.add(
						'productosTienda__nombreProducto'
					);
					nombreProductoHTML.textContent = producto.nombre;

					const precioProductoHTML = document.createElement('p');
					precioProductoHTML.classList.add(
						'productosTienda__precioProducto'
					);
					precioProductoHTML.textContent = producto.precio;

					const descripcionProductoHTML =
						document.createElement('span');
					descripcionProductoHTML.classList.add(
						'productosTienda__descripcionProducto'
					);
					descripcionProductoHTML.textContent = producto.descripcion;

					const categoriaProductoHTML =
						document.createElement('span');
					categoriaProductoHTML.classList.add(
						'productosTienda__categoriaProducto'
					);
					categoriaProductoHTML.textContent = this.#categorias.find(
						categoria => categoria.id === producto.categoria_id
					).descripcion;

					const imagenes = producto.imagenes.split(' ');

					const imagenesHTML = [];

					for (const imagen of imagenes) {
						const imagenProductoHTML =
							document.createElement('img');
						imagenProductoHTML.classList.add(
							'productosTienda__imagenProducto'
						);
						imagenProductoHTML.src = imagen;
						imagenesHTML.push(imagenProductoHTML);
					}

					productoHTML.append(imagenesHTML[0]);

					productoHTML.append(
						precioProductoHTML,
						nombreProductoHTML,
						descripcionProductoHTML,
						categoriaProductoHTML
					);

					productosContenedor.append(productoHTML);
				});
			});
	}
}

// function codificarImagenes(arrayFiles) {
// 	const reader = new FileReader();
// 	let imagenes = '';

// 	for (file of arrayFiles) {
// 		const reader = new FileReader();
// 		reader.addEventListener('loadend', e => {
// 			imagenes += `${reader.result} `;
// 		});
// 		reader.readAsDataURL(file);
// 	}
// }
let imagenes = '';
const ui = new UI();
const btnAgregarProducto = ui.btnAgregarProducto;

document.addEventListener('DOMContentLoaded', ui.rellenarPerfil.bind(ui));
document.addEventListener('DOMContentLoaded', ui.mostrarCategorias.bind(ui));

btnAgregarProducto.addEventListener('click', () => {});

const modalAgregarProducto = ui.modalAgregarProducto;

const dialogAgregarProducto = ui.dialogAgregarProducto;

const btnSubirImagen = ui.btnSubirImagen;

const btnSubmitProducto = ui.btnSubmitProducto;

btnAgregarProducto.addEventListener('click', e => {
	modalAgregarProducto.classList.add('modal--visible');
}); //abre el modal

function cerrarModal() {
	modalAgregarProducto.classList.remove('modal--visible'); //cierra el modal
}

dialogAgregarProducto.addEventListener('mouseleave', e => {
	modalAgregarProducto.addEventListener('click', cerrarModal); //cierra el modal cuando se toca fuera del dialog
});

dialogAgregarProducto.addEventListener('mouseenter', e => {
	modalAgregarProducto.removeEventListener('click', cerrarModal);
});

btnSubirImagen.addEventListener('change', e => {
	const imagenesPrevias = document.querySelectorAll(
		'.formModal__imagePreview'
	);

	if (imagenesPrevias) imagenesPrevias.forEach(imagen => imagen.remove());

	const inputImage = ui.inputImage;
	const files = Array.from(ui.inputImage.files);

	for (let file of files) {
		const reader = new FileReader();
		reader.addEventListener('loadend', e => {
			let image = document.createElement('img');
			imagenes += `${reader.result} `;
			image.src = e.target.result; //obtiene la imagen del file reader
			image.classList.add(
				'formModal__imagePreview--visible',
				'formModal__imagePreview'
			);
			inputImage.after(image);
		});

		reader.readAsDataURL(file);
	}
});

btnSubmitProducto.addEventListener('click', e => {
	//Aquí se hace el fetch para registrar la tienda
	e.preventDefault();
	const form = document.querySelector('.formModal');

	const camposCorrectos = ui.validarCamposCorrectos();

	if (!camposCorrectos) return;

	const nombre = ui.inputName.value;
	const precio = ui.inputPrice.value;
	const categoriaId = ui.inputCategoria.value;
	const idTienda = JSON.parse(sessionStorage.getItem('tienda')).RIF;
	const descripcion = ui.inputDescription.value;

	const data = ui.data;

	const token = data.token;

	const cliente_id = data.user.id;

	const formData = new FormData(form);
	// formData.append('nombre', nombre);
	// formData.append('precio', precio);
	// formData.append('categoria_id', categoriaId);
	formData.append('tienda_id', idTienda);
	// formData.append('descripcion', descripcion);
	// formData.append('imagen', imagenes);
	// formData.append('imagen', ui.inputImage.files[0]);
	for (const entry of formData) {
		console.log(entry);
	}

	btnSubmitProducto.disabled = true;
	btnSubmitProducto.classList.add('.formModal__submit--disabled');

	fetch('http://127.0.0.1:3000/api/productos/createProduct', {
		mode: 'cors',
		credentials: 'same-origin',
		method: 'POST',
		body: formData,
		headers: {
			Authorization: 'Bearer ' + token,
		},
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
		.catch(err => console.log(err))
		.finally(() => {
			btnSubmitProducto.disabled = false;
			btnSubmitProducto.classList.remove('.formModal__submit--disabled');
		});
});
