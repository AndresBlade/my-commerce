'use strict';

class UI {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('user')).data;

		console.log('nopasa');

		if (this.data.user?.tipo_id === 1) {
			header.location.href =
				'http://127.0.0.1/e-commerce-tarea/frontend/vistas/perfil.html';
		}

		console.log('pasa');

		this.mostrarVentas();
	}

	get ventasFlex() {
		return document.querySelector('.ventas__flex');
	}

	#tiendas = [];

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

	#obtenerVentas() {
		const { token } = this.data;
		return this.#obtenerMisTiendas().then(() => {
			const urls = this.#tiendas.map(
				tienda =>
					`http://127.0.0.1:3000/api/ventas_detalle/getSellsByTienda/${tienda.RIF}`
			);

			const requests = urls.map(url =>
				fetch(url, {
					method: 'GET',
					url: 'http://127.0.0.1:3000',
					headers: {
						Authorization: 'Bearer ' + token,
					},
				})
			);

			return Promise.all(requests);
		});
	}

	mostrarVentas() {
		this.#obtenerVentas().then(respuestas => {
			// respuestas.forEach(respuesta => {
			//     const tienda = this.#tiendas.find(tienda => tienda.RIF === respuesta.RIF);
			// 	respuesta.json().then(ventas => ventas);
			// });
			const parent = document.querySelector('.ventas__flex');
			this.#tiendas.forEach((tienda, index) => {
				const ventasTiendaHTML = document.createElement('div');
				ventasTiendaHTML.classList.add('ventas__tienda');

				const ventasTiendaTituloHTML = document.createElement('h2');
				ventasTiendaTituloHTML.textContent = tienda.nombre;

				ventasTiendaHTML.append(ventasTiendaTituloHTML);

				const ventasTiendaContenedorHTML =
					document.createElement('div');
				ventasTiendaContenedorHTML.classList.add('ventas__contenedor');

				respuestas[index]
					.json()
					.then(ventas => {
						console.log(ventas);
						ventas.forEach(venta => {
							// const ventaHTML = `
							//     <div class="ventas__flex__item">
							//         <div class="ventas__flex__item__container">
							//             <div class="ventas__flex__item__container__img">
							//                 <img src="${venta.imagen}" alt="ImagenProducto"/>
							//             </div>
							//             <div class="ventas__flex__item__container__info">
							//                 <h3>${venta.nombre}</h3>
							//                 <p>${venta.descripcion}</p>
							//                 <p>${venta.precio}</p>
							//             </div>
							//         </div>
							//     </div>
							// `;

							// this.ventasFlex.innerHTML += ventaHTML;

							const {
								createdAt: fechaCreacion,
								venta_cabecera: {
									ventas_detalles_id,
									venta_detalle: {
										precio,
										cantidad,
										producto,
									},
								},
							} = venta;

							const ventaHTML = document.createElement('div');
							ventaHTML.classList.add('ventas__venta');

							ventaHTML.innerHTML = `
                            <p class="ventas__nombreProducto"><span class="ventas__title">Nombre del producto: </span>${
								producto.nombre
							}</p>
                            <p class="ventas__fechaCompraProducto"><span class="ventas__title">Fecha de compra: </span>${
								fechaCreacion.split('T')[0] +
								' ' +
								fechaCreacion.split('T')[1].split('.')[0]
							}</p>
                            <p class="ventas__precioProducto"><span class="ventas__title">Precio individual: </span>${precio}</p>
                            <p class="ventas__cantidadProducto"><span class="ventas__title">Cantidad: </span>${cantidad}</p>
                            <p class="ventas__totalProducto"><span class="ventas__title">Total: </span>${
								cantidad * precio
							}</p>
                            <p class="ventas__nroFactura"><span class="ventas__title">Número de Factura: </span>${ventas_detalles_id}</p>
                        `;

							ventasTiendaContenedorHTML.append(ventaHTML);
						});
					})
					.then(() => {
						ventasTiendaHTML.append(ventasTiendaContenedorHTML);
						parent.append(ventasTiendaHTML);
					});
			});
		});
	}
}

const ui = new UI();
