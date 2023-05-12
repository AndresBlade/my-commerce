'use strict';

const boton_creaCuenta = document.querySelector('.btn-texto');
const boton_creaCuentaLink = document.querySelector('.btnCrearCuenta');

if(localStorage.length > 0)
{
	document.addEventListener('DOMContentLoaded', () => {

	const data = JSON.parse(localStorage.getItem('user')).data;
	const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';
	
	if(type === 'Cliente')
	{
		boton_creaCuenta.textContent = 'Registra tu tienda'
		boton_creaCuentaLink.href = '#';
	}
	else
	{

	}
});

}