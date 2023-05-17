'use strict';
const params = new URLSearchParams(window.location.search);
let pageProduct =
	params.get('pageProduct') != null ? params.get('pageProduct') : 0;
let pageTienda =
	params.get('pageTienda') != null ? params.get('pageTienda') : 0;

const grid = document.querySelector('.grid');
const grid_tienda = document.querySelector('.grid_tienda');

function fetchProducto(pageProduct = 0) {
	return fetch(
		`http://127.0.0.1:3000/api/productos/getProducts?page=${pageProduct}`,
		{
			method: 'GET',
			url: 'http://127.0.0.1:3000',
		}
	)
		.then(respuesta => {
			if (!respuesta.ok)
				return respuesta.text().then(texto => Promise.reject(texto));
			return respuesta.json();
		})
		.catch(err => console.log(err));
}

function fetchTienda(pageTienda = 0) {
	return fetch(
		`http://127.0.0.1:3000/api/tienda/tiendas?page=${pageTienda}`,
		{
			method: 'GET',
			url: 'http://127.0.0.1:3000',
		}
	)
		.then(respuesta => {
			if (!respuesta.ok)
				return respuesta.text().then(texto => Promise.reject(texto));
			return respuesta.json();
		})
		.catch(err => console.log(err));
}

const productosGrid = document.querySelector('#gridPorducts');
const tiendasGrid = document.querySelector('#gridTienda');

function renderizarProductos(productos) {
	productosGrid.innerHTML = '';

	productos.forEach(producto => {
		const productoHTML = document.createElement('a');
		productoHTML.style.textDecoration = 'none';
		productoHTML.classList.add('producto');
		const imagenes = producto.imagenes.split(' ');
		const imagenHTML = `<img class="producto__imagen" src="${
			imagenes[Math.floor(Math.random() * imagenes.length)]
		}" />`;
		productoHTML.innerHTML += imagenHTML;
		productoHTML.innerHTML += `
      <div class="informacion">
        <span class="tipo-envio">Envío Gratis</span>
        <span class="precio">${producto.precio}</span>
        <span class="precio-envio">Envío gratis</span>
        <span class="descripcion">${producto.nombre}</span>
      </div>`;

		const url = new URL(
			'http://127.0.0.1/e-commerce-tarea/frontend/vistas/producto.html'
		);
		url.searchParams.set('id', producto.id);

		productoHTML.href = url.href;
		productosGrid.append(productoHTML);
	});
}

function renderizarTiendas(tiendas) {
	tiendasGrid.innerHTML = '';
	tiendas.forEach(tienda => {
		const tiendaHTML = document.createElement('a');
		tiendaHTML.style.textDecoration = 'none';
		tiendaHTML.classList.add('producto');
		tiendaHTML.innerHTML += `
      <img src="${tienda.imagen}" class='producto__imagen' alt="" />
      <div class="informacion">
	  <span class="tienda_nombre">${tienda.nombre}</span>
        <span class="descripcion">${tienda.descripcion}</span>
        <span class="ubicacion">Ir a ver</span>
      </div>`;
		const url = new URL(
			'http://127.0.0.1/e-commerce-tarea/frontend/vistas/tienda.html'
		);
		url.searchParams.set('RIF', tienda.RIF);
		tiendaHTML.href = url.href;
		tiendasGrid.append(tiendaHTML);
	});
}

function actualizarURL(pageProduct, pageTienda) {
	const params = new URLSearchParams(window.location.search);
	params.set('pageProduct', pageProduct);
	params.set('pageTienda', pageTienda);
	const nuevaURL = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState({}, '', nuevaURL);
}

function cambiarPaginaProductos(pageProduct) {
	const params = new URLSearchParams(window.location.search);
	const pageTienda = params.get('pageTienda');

	fetchProducto(pageProduct)
		.then(productos => {
			console.log(productos);
			renderizarProductos(productos.products);
			actualizarURL(pageProduct, pageTienda);
		})
		.catch(err => console.log(err));
}

function cambiarPaginaTiendas(pageTienda) {
	const params = new URLSearchParams(window.location.search);
	const pageProduct = params.get('pageProduct');

	fetchTienda(pageTienda)
		.then(tiendas => {
			renderizarTiendas(tiendas.tiendas);
			actualizarURL(pageProduct, pageTienda);
		})
		.catch(err => console.log(err));
}

// Event listeners para los botones de paginación de productos
const btnPaginaProductosAnterior = document.getElementById(
	'btn-pagina-productos-anterior'
);
const btnPaginaProductosSiguiente = document.getElementById(
	'btn-pagina-productos-siguiente'
);

btnPaginaProductosAnterior.addEventListener('click', () => {
	const params = new URLSearchParams(window.location.search);
	let pageProduct = params.get('pageProduct');
	let paginaAnterior = parseInt(pageProduct) - 1;
	paginaAnterior = paginaAnterior >= 0 ? paginaAnterior : 0;
	console.log(paginaAnterior);

	cambiarPaginaProductos(paginaAnterior);
});

btnPaginaProductosSiguiente.addEventListener('click', () => {
	const params = new URLSearchParams(window.location.search);
	let pageProduct = params.get('pageProduct');
	let paginaSiguiente = parseInt(pageProduct) + 1;
	console.log(paginaSiguiente);
	cambiarPaginaProductos(paginaSiguiente);
});

// Event listeners para los botones de paginación de tiendas
const btnPaginaTiendasAnterior = document.getElementById(
	'btn-pagina-tiendas-anterior'
);
const btnPaginaTiendasSiguiente = document.getElementById(
	'btn-pagina-tiendas-siguiente'
);

btnPaginaTiendasAnterior.addEventListener('click', () => {
	const params = new URLSearchParams(window.location.search);
	let pageTienda = params.get('pageTienda');

	let paginaAnterior = parseInt(pageTienda) - 1;
	paginaAnterior = paginaAnterior >= 0 ? paginaAnterior : 0;
	console.log(paginaAnterior);
	cambiarPaginaTiendas(paginaAnterior);
});

btnPaginaTiendasSiguiente.addEventListener('click', () => {
	const params = new URLSearchParams(window.location.search);
	let pageTienda = params.get('pageTienda');
	let paginaSiguiente = parseInt(pageTienda) + 1;

	console.log(paginaSiguiente);
	cambiarPaginaTiendas(paginaSiguiente);
});

// Llamadas iniciales a las funciones de paginación
cambiarPaginaProductos(pageProduct);
cambiarPaginaTiendas(pageTienda);
