'use strict';

const dataJSON = localStorage.getItem('user');

//---------------***** Header dinamico ***********----------------
const boton_headerPerfil = document.querySelector('.btn_sesion');
const boton_perfilPerfil = document.querySelector('.btn_perfil');
const modalSesion = document.querySelector('.modal__sesion');
const btnSi = document.querySelector('.modal__si');
const btnNo = document.querySelector('.modal__no');

if (dataJSON) {
	document.addEventListener('DOMContentLoaded', () => {
		const data = JSON.parse(localStorage.getItem('user')).data;
		const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';

		if (type === 'Cliente') {
			console.log('hay una sesion abierta');
			boton_headerPerfil.textContent = 'Cerrar Sesión';
			boton_headerPerfil.href = '#';
			boton_perfilPerfil.style.display = 'block';

			boton_headerPerfil.addEventListener('click', e => {
				modalSesion.classList.add('modal__sesion--show');
				btnSi.addEventListener('click', e => {
					localStorage.removeItem('user');
					window.location.href =
						'http://127.0.0.1/e-commerce-tarea/frontend/index.html';
				});

				btnNo.addEventListener('click', e => {
					e.preventDefault();
					modalSesion.classList.remove('modal__sesion--show');
				});
			});
		} else {
		}
	});
}
