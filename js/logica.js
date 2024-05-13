let carrito = [];
const contenedorProds = document.getElementById('misprods');
const tablaCarrito = document.getElementById('tablaCarrito');

function renderizarProductos(listaProds) {
    for (const prod of listaProds) {
        contenedorProds.innerHTML += `
        <div class="card" style="width: 25%;">
        <div class="card tarjetas";">
        <img class="card-img-top" src=${prod.foto} alt=${prod.nombre}>
        <div class="card-body">
          <h3 class="card-title">${prod.nombre}</h5>
          <p class="card-text">${prod.descripcion}</p>
          <p class="card-text">Precio: $ ${prod.precio}</p>
          <button class="btn compra btnCard" id=${prod.id}>Comprar</button>
        </div>
      </div>
        `
    }

    //evento de mouse
    const botonesCompra = document.getElementsByClassName('compra');
    for (const boton of botonesCompra) {
        boton.addEventListener('click', () => {
            const prodACarrito = listaProds.find(prod => prod.id == boton.id);
            agregarACarrito(prodACarrito);
            actualizarTablaCarrito();
        });
    }
}

// Utilización de Operadores ++ y Ternario
function agregarACarrito(producto) {
    carrito[producto.id] ? carrito[producto.id].cantidad++ : carrito[producto.id] = { producto: producto, cantidad: 1 };
}

function actualizarTablaCarrito() {
    tablaCarrito.innerHTML = '';
    let total = 0;
    for (const key in carrito) {
        const item = carrito[key];
        const subtotal = item.cantidad * item.producto.precio;
        total += subtotal;
        tablaCarrito.innerHTML += `
            <tr>
                <td>${item.producto.id}</td>
                <td>${item.producto.nombre}</td>
                <td>${item.producto.precio}</td>
                <td>${item.cantidad}</td>
                <td>${subtotal}</td>
            </tr>
        `;
    }
    tablaCarrito.innerHTML += `
        <tr>
            <td colspan="4">Total</td>
            <td>${total}</td>
        </tr>
    `;
}

renderizarProductos(productos);

//Evento de teclado Y Operador Lógico OR
const campoEmail = document.getElementById('email');

campoEmail.addEventListener('input', () => {
    if ((!campoEmail.value.includes('@')) || (!campoEmail.value.includes('.'))) {
        document.getElementById('mensaje').innerText = 'El correo debe contener "@" y "." para ser válido!'
    } else {
        document.getElementById('mensaje').innerText = ''
    }
})

//Eventos de mouse

const botonFinalizarCompra = document.getElementById('btnCompra');
btnCompra.addEventListener('click', dispararAlert);

function dispararAlert() {

    // Librería Sweet Alert

    Swal.fire("Gracias por su compra!");
}


//Creación y almacenamiento de un array agregando correos electrónicos 

document.getElementById('contacto').addEventListener('submit', function (event) {
    event.preventDefault();

    let emailInput = document.getElementById('email');
    let email = emailInput.value;

    if (email.trim() !== '') {

        //Uso de Local Storarage y JSON

        let emails = JSON.parse(localStorage.getItem('emails')) || [];

        emails.push(email);

        localStorage.setItem('emails', JSON.stringify(emails));

        emailInput.value = '';
    }
});

//Consumo de API para cotización del Dolar

const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest"
fetch(URLDOLAR)
    .then(respuesta => respuesta.json())
    .then(datos => {
        const cotizacion = datos.blue.value_sell;
        const textoCotizacion = `Recibimos pago en Dolares a la cotización actual: ${cotizacion} ARS`;
        document.getElementById('cotizacion').innerHTML = textoCotizacion;
    })
    .catch(error => console.log('Hubo un problema con la solicitud:', error));

//Verificación de lista de emails guardados por consola
const listaEmails = JSON.parse(localStorage.getItem('emails'));
console.log(listaEmails);