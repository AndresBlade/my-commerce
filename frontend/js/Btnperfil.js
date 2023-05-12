'use strict';

//---------------***** Header dinamico ***********----------------
const boton_header = document.querySelector('.btn_sesion');
const boton_perfil = document.querySelector('.btn_perfil');
const modalSesion = document.querySelector('.modal__sesion');
const btnSi = document.querySelector('.modal__si');
const btnNo = document.querySelector('.modal__no');

if(localStorage.length > 0)
{
	document.addEventListener('DOMContentLoaded', () => {
	const data = JSON.parse(localStorage.getItem('user')).data;
	const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';
	
	if(type === 'Cliente')
	{
		console.log('hay una sesion abierta');
		boton_header.textContent = 'Cerrar Sesión';
		boton_header.href = '#';
		boton_perfil.style.display = 'block';

		boton_header.addEventListener('click', (e) =>
		{
			modalSesion.classList.add('modal__sesion--show');
			btnSi.addEventListener('click', (e) => 
			{
				localStorage.removeItem('user');
				boton_header.href = 'http://127.0.0.1/e-commerce-tarea/frontend/index.html';
				location.reload();
			})
			
			btnNo.addEventListener('click', (e)=>
			{
				e.preventDefault();
				modalSesion.classList.remove('modal__sesion--show');
			});
		})

	}
	else
	{

	}
});

}