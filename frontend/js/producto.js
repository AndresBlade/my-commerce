const productID = new URLSearchParams(window.location.search);
const id = productID.get('id');

function fetchProducto(id) {
  return fetch(`http://127.0.0.1:3000/api/productos/getProductByID/${id}`, {
    method: 'GET',
    url: 'http://127.0.0.1:3000',
  })
    .then(respuesta => {
      if (!respuesta.ok) {
        return respuesta.text().then(texto => Promise.reject(texto)); 
      }   
      return respuesta.json();
    })
    .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducto(id).then(respuesta => {
    console.log(respuesta);
    const productName = respuesta.productByID.nombre;
    const productPrice = respuesta.productByID.precio;
    const productDescripcion = respuesta.productByID.descripcion;
    const productImagenes = respuesta.productByID.imagenes;

    const tienda = respuesta.productByID.tienda;
    const tiendaNombre = tienda.nombre;
    const tiendaImagen = tienda.imagen;
    
    
    document.querySelector('.productName').textContent = productName;
    document.querySelector('.price').textContent = productPrice;
    document.querySelector('.descripcion').textContent = productDescripcion;
    document.querySelector('.tiendaName').textContent = tiendaNombre;

    if (tiendaImagen != null){
        document.querySelector('.img_tienda').src = tiendaImagen;
    }

    const slider = document.querySelector('.slider');
    const slider_nav = document.querySelector('.slider-nav');

    const imagenes = productImagenes.split(' ');
    console.log(imagenes);

    let slide = imagenes.length - 1;

    while(slide >= 0){
            const imagenHTML = `<img id="slide-${slide}" src="${imagenes[slide]}" alt="ImagenProducto"/>`;
            slider.innerHTML += imagenHTML;
            slide--;
        }
    
    let slide_nav = imagenes.length - 1;
    while(slide_nav >= 0){
        const scroll = ` <a href="#slide-${slide_nav}"></a>`
        slider_nav.innerHTML += scroll;
        slide_nav--;
    }
  });
});
    