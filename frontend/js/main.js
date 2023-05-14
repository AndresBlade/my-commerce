'use strict';

let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('.header');

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
const boton_creaCuenta = document.querySelector('.btn-texto');
const boton_creaCuentaLink = document.querySelector('.btnCrearCuenta');
const modalSesion = document.querySelector('.modalSesion__sesion');
const btnSi = document.querySelector('.modalSesion__si');
const btnNo = document.querySelector('.modalSesion__no');

const dataJSON = localStorage.getItem('user');

document.addEventListener('DOMContentLoaded', () => {
	if (!dataJSON) return;

	const data = JSON.parse(dataJSON).data;

	const linkVentas = document.querySelector('[href="./ventas.html"]');

	if (data.user.tipo_id === 1 && linkVentas) linkVentas.remove();
	if (boton_creaCuenta) {
		boton_creaCuenta.textContent = 'Registra tu tienda';
		boton_creaCuentaLink.href =
			'http://127.0.0.1/e-commerce-tarea/frontend/vistas/misTiendas.html';
	}

	console.log('hay una sesion abierta');
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

//      perfil
// const toggle = document.querySelector(".toggle");
// const menuDashboard = document.querySelector(".menu-dashboard");
// const iconoMenu = toggle.querySelector("i");
// const enlacesMenu = document.querySelectorAll(".enlace");

// toggle.addEventListener("click", () => {
//     menuDashboard.classList.toggle("open");

//     if (iconoMenu.classList.contains("bx-menu")) {
//         iconoMenu.classList.replace("bx-menu", "bx-x");
//     } else {
//         iconoMenu.classList.replace("bx-x", "bx-menu");
//     }
// });

// enlacesMenu.forEach((enlace) => {
//     enlace.addEventListener("click", () => {
//         menuDashboard.classList.add("open");
//         iconoMenu.classList.replace("bx-menu", "bx-x");
//     });
// });
