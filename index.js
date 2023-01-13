const app = document.querySelector('.app');
const btn = document.querySelector('#carrito')
const carro = document.querySelector('#contenido')
const comprar = document.querySelector('#comprar');
const vaciar = document.querySelector('#vaciar')
let products;
let carrito = []

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
})  

function showData() {
    let html = '';
    products.forEach(prod => {
        const { titulo, descripcion, imagen, id, precio } = prod;
        html += `
        <div class="card text-center" style="width: 18rem; ">
  <img class="card-img-top" src="${imagen}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${titulo}</h5>
    <p class="card-text">${descripcion}</p>
    <button class="btn btn-primary" onclick="agregarId(${id})">Adquirir curso por: ${precio}USD</button>
  </div>
</div>
        `
    });
    app.innerHTML = html;
}
async function getData() {
    await fetch('./items.json')
        .then((res) => res.json())
        .then((data) => products = data);
    console.log(products);
    showData()
}

getData()

function agregarId(id) {
    let product = products.find((prod) => prod.id === id)
    if (carrito.find((prod) => prod.id == id)) {
        alert('ya tenés el curso añadido en el carrito')
    }
    else {
        carrito.push(product)
    }
}
function eliminarId(id){
    carrito = carrito.filter((prod)=> prod.id !== id)
    mostrar();
}
function mostrar() {
    let html = '';
    let precioFinal = 0;
    carrito.forEach((prod) => {
        const { imagen, titulo, precio, id } = prod;
        precioFinal += precio;
        html += `
        <div class="item">
        <img src="${imagen}"/>
        <h3>${titulo}</h3>
        <p>${precio}</p
        <br>
        <button class="red-button" onclick="eliminarId(${id})">eliminar</button>
        </div>
        `
    })
    comprar.innerHTML = `Abonar ${precioFinal}USD y continuar`
    carro.innerHTML = html
    guardarCarrito();
}

comprar.addEventListener('click', function(){
    alert('tu compra fue exitosa, volve a comprar si querés, sino nos vemos')
    carrito = [];
})
vaciar.addEventListener('click', function(){
    carrito=[]
    mostrar()
})

function guardarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}