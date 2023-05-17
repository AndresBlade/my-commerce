'use strict';

let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('.header');

let productosGrid = document.querySelector('.tiendas-container');
let tiendasGrid = document.querySelector('.grid');

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

function fetchTienda(pageTienda = 0, size = 6) {
	return fetch(
		`http://127.0.0.1:3000/api/tienda/tiendas?page=${pageTienda}&size=${size}`,
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
		<img src="${tienda.imagen}" alt="" />
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

searchBtn.onclick = function () {
	searchBox.classList.add('active');
	closeBtn.classList.add('active');
	searchBtn.classList.add('active');
	menuToggle.classList.add('hide');
	header.classList.remove('open');
};

closeBtn.onclick = function () {
	searchBox.classList.remove('active');
	closeBtn.classList.remove('active');
	searchBtn.classList.remove('active');
	menuToggle.classList.remove('hide');
};
menuToggle.onclick = function () {
	header.classList.toggle('open');
	closeBtn.classList.remove('active');
	searchBtn.classList.remove('active');
	menuToggle.classList.remove('hide');
};

//---------------***** Index dinamico ***********----------------
const boton_header = document.querySelector('.btn_sesion');
const boton_perfil = document.querySelector('.btn_perfil');
const boton_creaCuenta = document.querySelector('.btn-texto');
const boton_creaCuentaLink = document.querySelector('.btnCrearCuenta');
const modalSesion = document.querySelector('.modalSesion__sesion');
const btnSi = document.querySelector('.modalSesion__si');
const btnNo = document.querySelector('.modalSesion__no');

const dataJSON = localStorage.getItem('user');

document.addEventListener('DOMContentLoaded', () => {
	fetchProducto()
		.then(productos => {
			console.log(productos);
			renderizarProductos(productos.products);
		})
		.catch(err => console.log(err));

	fetchTienda()
		.then(tiendas => {
			renderizarTiendas(tiendas.tiendas);
		})
		.catch(err => console.log(err));
	if (!dataJSON) return;

	boton_perfil.classList.add('btn_perfil--show');

	const data = JSON.parse(dataJSON).data;

	const linkVentas = document.querySelector('[href="./ventas.html"]');

	if (data.user.tipo_id === 1 && linkVentas) linkVentas.remove();
	if (boton_creaCuenta) {
		boton_creaCuenta.textContent = 'Registra tu tienda';
		boton_creaCuentaLink.href =
			'http://127.0.0.1/e-commerce-tarea/frontend/vistas/misTiendas.html';
	}
	boton_header.textContent = 'Cerrar Sesión';
	boton_header.href = '#';

	boton_header.addEventListener('click', e => {
		modalSesion.classList.add('modalSesion__sesion--show');
		btnSi.addEventListener('click', e => {
			localStorage.removeItem('user');
			window.location.href = 'http://127.0.0.1/e-commerce-tarea/frontend';
		});

		btnNo.addEventListener('click', e => {
			e.preventDefault();
			modalSesion.classList.remove('modalSesion__sesion--show');
		});
	});
});
