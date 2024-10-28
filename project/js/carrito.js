let carrito = [];
let subtotal = 0;
let total = 0;
let iva = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.name === producto.name);

    // Asegúrate de que el precio sea un número
    producto.price = parseFloat(producto.price);

    if (productoExistente) {
        // Aumentar la cantidad si hay stock disponible
        if (productoExistente.quantity < producto.quantity) {
            productoExistente.quantity++;
        } else {
            alert('No hay más stock disponible para este producto');
        }
    } else {
        // Agregar el producto al carrito con cantidad 1
        carrito.push({ ...producto, quantity: 1 });
    }

    calcularTotales();
    actualizarCarrito();
}

// Calcular totales
function calcularTotales() {
    subtotal = 0;

    carrito.forEach(item => {
        subtotal += item.price * item.quantity; // Precio por cantidad
    });

    iva = subtotal * 0.13; // 13% de IVA
    total = subtotal + iva; // Total con IVA
}

// Actualizar la visualización del carrito
function actualizarCarrito() {
    const cartBtn = document.getElementById('cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartSubTotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    if (cartBtn) cartBtn.innerText = `Carrito (${carrito.length})`;
    
    if (cartItems) {
        cartItems.innerHTML = '';

        carrito.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} - ₡${item.price.toFixed(2)} - Cantidad: ${item.quantity} - Total: ₡${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
        });
    }

    if (cartSubTotal) cartSubTotal.innerText = `₡${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.innerText = `₡${iva.toFixed(2)}`;
    if (cartTotal) cartTotal.innerText = `₡${total.toFixed(2)}`;
}

// Mostrar/Ocultar carrito
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            const cart = document.getElementById('cart');
            if (cart) {
                cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});

// Función para finalizar la compra
function finalizarCompra() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let productos = JSON.parse(localStorage.getItem('products')) || [];
    let compraValida = true;

    // Verificar stock y descontar productos del inventario
    carrito.forEach(item => {
        let producto = productos.find(p => p.name === item.name);
        if (producto) {
            if (producto.quantity >= item.quantity) {
                producto.quantity -= item.quantity;
            } else {
                compraValida = false;
                alert(`No hay suficiente stock para ${item.name}`);
            }
        }
    });

    if (compraValida) {
        let comprasRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
        let nuevaCompra = {
            usuario: loggedInUser,
            productos: carrito,
            total: total.toFixed(2),
            fecha: new Date().toLocaleString()
        };

        comprasRealizadas.push(nuevaCompra);
        localStorage.setItem('comprasRealizadas', JSON.stringify(comprasRealizadas));
        localStorage.setItem('products', JSON.stringify(productos));

        carrito = [];
        subtotal = 0;
        iva = 0;
        total = 0;
        actualizarCarrito();

        alert('Compra realizada con éxito.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                alert('Debes iniciar sesión para realizar una compra.');
                window.location.href = 'login.html'; 
                return;
            }

            finalizarCompra();
        });
    } else {
        console.error('El elemento checkout-btn no existe en el DOM');
    }
});

