'use strict';

const productID = new URLSearchParams(window.location.search);
const id = productID.get('id');
const imageContainer = document.querySelector('.gallery__container_img');

function fetchProducto(id) {
	return fetch(`http://127.0.0.1:3000/api/productos/getProductByID/${id}`, {
		method: 'GET',
		url: 'http://127.0.0.1:3000',
	})
		.then(respuesta => {
			if (!respuesta.ok) {
				return respuesta.text().then(texto => Promise.reject(texto));
			}
			return respuesta.json();
		})
		.catch(err => console.log(err));
}

const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
	if (window.innerWidth >= 1115) {
		imagesModal.style.display = 'grid';
	}
});

document.addEventListener('DOMContentLoaded', () => {
	fetchProducto(id)
		.then(respuesta => {
			console.log(respuesta);
			const productName = respuesta.productByID.nombre;
			const productPrice = respuesta.productByID.precio;
			const productDescripcion = respuesta.productByID.descripcion;
			const productImagenes = respuesta.productByID.imagenes;

			const tienda = respuesta.productByID.tienda;
			console.log(tienda);
			const tiendaNombre = tienda.nombre;
			const tiendaImagen = tienda.imagen;
			document.querySelector('.productName').textContent = productName;
			document.querySelector('.price').textContent = `$${productPrice}`;
			document.querySelector('.descripcion').textContent =
				productDescripcion;
			document.querySelector('.tiendaName').textContent = tiendaNombre;
			document.querySelector('.tiendaName').href =
				'tienda.html?RIF=' + tienda.RIF;
			if (tiendaImagen != null) {
				document.querySelector('.img_tienda').src = tiendaImagen;
			}

			let gallery = document.querySelector('.gallery__thumnails');
			gallery.innerHTML = '';

			const imagenes = productImagenes.split(' ');
			let slide = imagenes.length - 1;

			document.querySelector(
				'.gallery__container_img'
			).style.backgroundImage = `url('${imagenes[0]}')`;
			while (slide >= 0) {
				const imagenHTML = `<img class="gallery__thumnail" id="${slide}" src="${imagenes[slide]}" alt="ImagenProducto"/>`;
				gallery.innerHTML += imagenHTML;
				slide--;
			}
			const imagenesGaleria =
				document.querySelectorAll('.gallery__thumnail');
			imagenesGaleria.forEach(imagen => {
				imagen.addEventListener('click', () => {
					const url = imagen.src;
					imagenGrande.style.backgroundImage = `url('${url}')`;
				});
			});

			const btnComprar = document
				.querySelector('.details')
				.querySelector('button');

			console.log(btnComprar);
			let token;

			if (localStorage.getItem('user')) {
				token = JSON.parse(localStorage.getItem('user')).data.token;
			}

			btnComprar.addEventListener('click', () => {
				if (!localStorage.getItem('user'))
					window.location.href =
						'http://127.0.0.1/e-commerce-tarea/frontend/vistas/signup.html';

				const venta = {
					producto_id: id,
					cantidad: '1',
					precio: respuesta.productByID.precio,
				};

				console.log(venta);

				const ventaJSON = JSON.stringify(venta);

				console.log(ventaJSON);
				fetch(
					`http://127.0.0.1:3000/api/ventas_detalle/individualPurchase`,
					{
						mode: 'cors',
						credentials: 'same-origin',
						method: 'POST',
						headers: {
							Authorization: 'Bearer ' + token,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(venta),
					}
				)
					.then(respuesta => {
						if (!respuesta.ok) {
							return respuesta
								.text()
								.then(texto => Promise.reject(texto));
						}
						return respuesta.json();
					})
					.then(respuesta => {
						console.log(respuesta);
						btnComprar.classList.add(
							'compraProducto__btnComprar--comprado'
						);
						btnComprar.textContent = 'Comprado Exitosamente!';
					})
					.catch(err => {
						console.log(err);
						btnComprar.classList.add(
							'compraProducto__btnComprar--error'
						);
						btnComprar.textContent = 'Error al comprar';
						return;
					});
			});

			return { id: respuesta.productByID.tienda_id, token };
		})
		.then(datosTienda => {
			const { id, token } = datosTienda;
			fetch(`http://127.0.0.1:3000/api/tienda/getTiendasByRIF/${id}`, {
				method: 'GET',
				url: 'http://127.0.0.1:3000',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
				.then(respuesta => {
					if (!respuesta.ok) {
						return respuesta
							.text()
							.then(texto => Promise.reject(texto));
					}
					return respuesta.json();
				})
				.then(respuesta => {
					const userId = respuesta.data.usuarioTienda.id;

					console.log({
						userId,
						id: JSON.parse(localStorage.getItem('user')).data.user
							.id,
					});
					if (
						userId ===
						JSON.parse(localStorage.getItem('user')).data.user.id
					) {
						const btnComprar = document
							.querySelector('.details')
							.querySelector('button');

						btnComprar.classList.add(
							'compraProducto__btnComprar--deshabilitado'
						);

						btnComprar.title =
							'No puedes comprar tu propio producto';
						btnComprar.disabled = true;
					}
				})
				.catch(err => console.log(err));
		});
});

let imagenGrande = document.querySelector('.gallery__container_img');
