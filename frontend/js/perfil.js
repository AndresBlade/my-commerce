import { mostrarMensajeError } from './utilidades.js';

document.addEventListener('DOMContentLoaded', () => {
	const data = JSON.parse(localStorage.getItem('user')).data;
	console.log(data);
	const name = data.user.nombre;
	const email = data.user.correo;
	const type = data.user.tipo_id === 1 ? 'Cliente' : 'Otro tipo rarito';

	document.querySelector('.userProfile__name').textContent = name;
	document.querySelector('.userProfile__email').textContent = email;
	document.querySelector('.userProfile__type').textContent = type;
});
//este codigo ya no sirve xd
// var profilePic = document.getElementById("profile-pic");
// var inputFile = document.getElementById("input-file");
// inputFile.onchange = function(){
// 	profilePic.src = URL.createObjectURL(inputFile.files[0])
// }

//amen
var profilePic = document.getElementById("profile-pic");
profilePic.src = URL.createObjectURL(inputFile.files[0])
const imagen = profilePic

// const imagen = ui.inputImage.files[0];
const formData = new FormData();

formData.append('imagen', imagen);

fetch('http://127.0.0.1:3000/api/tienda/register', {
	mode: 'cors',
	credentials: 'same-origin',
	method: 'POST',
	headers: {
		Authorization: 'Bearer ' + token,
	},
	body: formData,
}) .then(respuesta => {
	respuesta.json();
})


