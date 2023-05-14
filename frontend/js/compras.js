class UI {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('user')).data;

		this.mostrarCompras();
	}

	#obtenerCompras() {
		const { id } = this.data.user;
		const { token } = this.data;

		return fetch(
			`http://127.0.0.1:3000/api/ventas_detalle/getPurchasesByUser/${id}`,
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

	mostrarCompras() {
		this.#obtenerCompras().then(compras => {
			const parent = document.querySelector('.compras__flex');
			compras.forEach(compra => {
				const compraHTML = document.createElement('div');
				compraHTML.classList.add('compras__compra');

				const {
					createdAt: fechaCreacion,
					venta_detalle: {
						cantidad,
						precio,
						producto: { nombre },
					},
				} = compra;

				const [fecha, hora] = fechaCreacion.split('T');

				compraHTML.innerHTML = `
                    <p><span class="bold">Nombre: </span>${nombre}</p>
                    <p><span class="bold">Fecha: </span>${fecha} ${hora}</p>
                    <p><span class="bold">Cantidad: </span>${cantidad}</p>
                    <p><span class="bold">Precio individual: </span>${precio}</p>
                    <p><span class="bold">Total: </span>${precio * cantidad}</p>
                `;

				parent.append(compraHTML);
			});
		});
	}
}

const ui = new UI();
