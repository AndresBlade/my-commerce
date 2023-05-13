'use strict';

const grid = document.querySelector('.grid');

fetch('http://127.0.0.1:3000/api/productos/getProducts', {
	method: 'GET',
	url: 'http://127.0.0.1:3000',
})
	.then(respuesta => {
		if (!respuesta.ok)
			return respuesta.text().then(texto => Promise.reject(texto)); //si no es ok, rechaza la promesa y pasa al catch
		return respuesta.json();
	})
	.then(respuesta => respuesta.allProducts)
	.then(productos =>
		productos.forEach(producto => {
			const productoHTML = document.createElement('div');
			productoHTML.classList.add('producto');
			const imagenes = producto.imagenes.split(' ');
			console.log(imagenes);
			for (const imagen of imagenes) {
				const imagenHTML = `<img class="producto__imagen" src="${imagen}" />`;
				productoHTML.innerHTML += imagenHTML;
			}
			productoHTML.innerHTML += `
			<div class="informacion">
			    <span class="tipo-envio">Envio Con normalidad</span>
			    <span class="precio">399.99$</span>
			    <span class="precio-envio">Envio gratis</span>
			    <span class="descripcion">${producto.nombre}</span>
			    <div class="calificacion">
			        <span class="icono-centrado">
			            <ion-icon name="star"></ion-icon>
			            <ion-icon name="star"></ion-icon>
			            <ion-icon name="star"></ion-icon>
			            <ion-icon name="star"></ion-icon>
			        </span>
			    </div>
			    <span class="ubicacion">Cabudare</span>
			</div>`;

			grid.append(productoHTML);
		})
	)
	.catch(err => console.log(err));

// producto.innerHTML = `<img src="../img/pc.jpeg" alt="">
// <div class="informacion">
//     <span class="tipo-envio">Envio Con normalidad</span>
//     <span class="precio">399.99$</span>
//     <span class="precio-envio">Envio gratis</span>
//     <span class="descripcion">Compu Buenisima</span>
//     <div class="calificacion">
//         <span class="icono-centrado">
//             <ion-icon name="star"></ion-icon>
//             <ion-icon name="star"></ion-icon>
//             <ion-icon name="star"></ion-icon>
//             <ion-icon name="star"></ion-icon>
//         </span>
//     </div>
//     <span class="ubicacion">Cabudare</span>
// </div>`;
