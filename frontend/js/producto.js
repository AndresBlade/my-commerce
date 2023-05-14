const productID = new URLSearchParams(window.location.search);
const id = productID.get('id');

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

document.addEventListener('DOMContentLoaded', () => {
	fetchProducto(id).then(respuesta => {
		console.log(respuesta);
		const productName = respuesta.productByID.nombre;
		const productPrice = respuesta.productByID.precio;
		const productDescripcion = respuesta.productByID.descripcion;
		const productImagenes = respuesta.productByID.imagenes;

		const tienda = respuesta.productByID.tienda;
		const tiendaNombre = tienda.nombre;
		const tiendaImagen = tienda.imagen;

		const btnComprar = document
			.querySelector('.compraProducto')
			.querySelector('button'); //por alguna razon no lo obtiene por clase del boton

		console.log(btnComprar);
		btnComprar.addEventListener('click', () => {
			const token = JSON.parse(localStorage.getItem('user')).data.token;
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
				.then(respuesta => console.log(respuesta))
				.then(() => {
					btnComprar.textContent = 'Comprado con exito!';
					btnComprar.classList.add(
						'compraProducto__btnComprar--comprado'
					);
				})
				.catch(err => {
					console.log(JSON.parse(err));
					btnComprar.textContent = 'Error al comprar';
					btnComprar.classList.add(
						'compraProducto__btnComprar--error'
					);
				});
		});

		document.querySelector('.productName').textContent = productName;
		document.querySelector('.price').textContent = `$${productPrice}`;
		document.querySelector('.descripcion').textContent = productDescripcion;
		document.querySelector('.tiendaName').textContent = tiendaNombre;

		if (tiendaImagen != null) {
			document.querySelector('.img_tienda').src = tiendaImagen;
		}

		const slider = document.querySelector('.slider');
		const slider_nav = document.querySelector('.slider-nav');

		const imagenes = productImagenes.split(' ');
		console.log(imagenes);

		let slide = imagenes.length - 1;

		while (slide >= 0) {
			const imagenHTML = `<img id="slide-${slide}" src="${imagenes[slide]}" alt="ImagenProducto"/>`;
			slider.innerHTML += imagenHTML;
			slide--;
		}

		let slide_nav = imagenes.length - 1;
		while (slide_nav >= 0) {
			const scroll = ` <a href="#slide-${slide_nav}"></a>`;
			slider_nav.innerHTML += scroll;
			slide_nav--;
		}
	});
});
