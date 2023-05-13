'use strict';

const openModal = document.querySelector('#cajita1');
const modal = document.querySelector('.modalSesion');
const closeModal = document.querySelector('.modalSesion__close');

openModal.addEventListener('click', e => {
	e.preventDefault();
	console.log('sirvo');
	modal.classList.add('modalSesion--show');
});

closeModal.addEventListener('click', e => {
	e.preventDefault();
	modal.classList.remove('modalSesion--show');
});
