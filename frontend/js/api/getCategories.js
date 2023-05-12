'use strict';

export async function getCategories() {
	return await fetch('http://127.0.0.1:3000/api/categorias/getCategories', {
		method: 'GET',
		url: 'http://127.0.0.1:3000',
	})
		.then(respuesta => {
			if (!respuesta.ok)
				return respuesta.text().then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
			return respuesta.json();
		})
		.then(resultado => {
			console.log(resultado);
			return resultado.categories;
		})
		.catch(err => console.log(err));
}
