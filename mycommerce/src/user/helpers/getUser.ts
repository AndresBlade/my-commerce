import { UserDataWrapper } from '../interfaces/UserData';

export const getUser = (user: {
	correo: string;
	contrasenna: string;
}): Promise<UserDataWrapper> =>
	fetch('http://127.0.0.1:3000/api/user/login', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<UserDataWrapper>;
	});
// .then(
// 	respuesta => localStorage.setItem('user', JSON.stringify(respuesta)) //guarda el usuario en el localstorage
// )
// .then(
// 	respuesta =>
// 		(window.location.href =
// 			'http://127.0.0.1/e-commerce-tarea/frontend/vistas/perfil.html') //redirige al perfil
// )

// .finally(() => {
// 	btnLogin.disabled = false;
// 	btnLogin.classList.remove('btn-login--disabled'); //vuelve a activar el boton
// });
