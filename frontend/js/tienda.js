const tiendaRIF = new URLSearchParams(window.location.search);
const RIF = tiendaRIF.get('RIF');

console.log(RIF)


function fetchTienda(RIF) {
	return fetch(`http://127.0.0.1:3000/api/tienda/getTiendasByRIF/${RIF}`, {
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

function fetchProductos(RIF) {
    return fetch(`http://127.0.0.1:3000/api/productos/getProductsByTienda/${RIF}`, {
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
    fetchTienda(RIF).then(respuesta => {
        const tiendaName = respuesta.data.nombre;
		const tiendaImagen = respuesta.data.imagen;
		const tiendaDescripcion = respuesta.data.descripcion;
		let createdAt = respuesta.data.createdAt;

        const date = new Date(createdAt);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        createdAt = formatter.format(date);

        if (tiendaImagen != null) {
			document.querySelector('.tienda_logo').src = tiendaImagen;
		}
        document.querySelector('.tienda_nombre').textContent = tiendaName;
		document.querySelector('.tienda_descripcion').textContent = tiendaDescripcion;
		document.querySelector('.about').textContent = `Acerca de ${tiendaName}:`;
		document.querySelector('.RIF').textContent = `RIF: ${RIF}:`;
		document.querySelector('.createdAt').textContent = `Creada el: ${createdAt}`;
    });

	fetchProductos(RIF).then(productos => {
		let productosArray = productos.tiendaProducts;
		let productoHTML = productosArray.map(producto => {
		  producto.imagenes = producto.imagenes.split(' ');
	  
		  return `            
			<section class="producto_tienda">
			  <img src="${producto.imagenes[Math.floor(Math.random() * producto.imagenes.length)]}" alt="${producto.nombre}" />
			  <div class="informacion">
				<span class="tipo-envio">Disponible</span>
				<span class="precio">$${producto.precio}</span>
				<span class="precio-envio">Envio Gratis</span>
				<span class="descripcion">${producto.descripcion}</span>
			  </div>
			</section>
		  `;
		}).join('');
		
		document.querySelector('.misTiendas__grid').innerHTML = productoHTML;
		
		// Agregar evento de clic a cada elemento de producto
		const productosElementos = document.querySelectorAll('.producto_tienda');
			productosElementos.forEach((elemento, index) => {
			elemento.addEventListener('click', () => {
				// Redireccionar a otra URL
				window.location.href = 'http://127.0.0.1/e-commerce-tarea/frontend/vistas/producto.html?id='+productosArray[index].id;
			});
		});
	});
});