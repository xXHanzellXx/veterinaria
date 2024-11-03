let carrito = [];
let subtotal = 0;
let total = 0;
let iva = 0;

// Función para cargar y mostrar los productos en la página principal
function loadProducts() {
    const productList = document.getElementById('product-list');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Limpiar el contenedor de productos
    productList.innerHTML = '';

    // Crear las tarjetas de productos
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <h3>${product.category}</h3>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Cantidad disponible: ${product.quantity}</p>
            ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
            <button class="add-to-cart-btn" ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>
        `;

        productList.appendChild(productCard);
    });

    // Agregar eventos a los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productIndex = this.getAttribute('data-index');
            const selectedProduct = products[productIndex];
            agregarAlCarrito(selectedProduct);
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.name === producto.name);

    // Asegúrate de que el precio sea un número
    producto.price = parseFloat(producto.price);

    if (productoExistente) {
        // Aumentar la cantidad si hay stock disponible
        if (productoExistente.quantity < producto.quantity) {
            alert('No hay más stock disponible para este producto');
        } else {
            productoExistente.quantity++;
        }
    } else {
        // Asegúrate de que haya stock disponible antes de agregar al carrito
        if (producto.quantity > 0) {
            // Agrega la imagen al objeto del carrito
            carrito.push({ ...producto, quantity: 1 });
        } else {
            alert('No hay stock disponible para este producto');
        }
    }

    calcularTotales();
    actualizarCarrito(); // Actualiza la visualización del carrito
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
    const cartItems = document.getElementById('cart-items');
    const cartSubTotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    // Limpia el contenido del carrito
    if (cartItems) {
        cartItems.innerHTML = '';
        carrito.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span>${item.name}</span>
                        <span>Precio: ₡${item.price.toFixed(2)}</span>
                        <span>Cantidad: ${item.quantity}</span>
                        <span>Total: ₡${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `;
            cartItems.appendChild(li);
        });
    }

    // Actualiza subtotales
    if (cartSubTotal) cartSubTotal.innerText = `₡${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.innerText = `₡${iva.toFixed(2)}`;
    if (cartTotal) cartTotal.innerText = `₡${total.toFixed(2)}`;
    document.getElementById('cart-btn').innerText = `Carrito (${carrito.length})`;
}

// Mostrar/Ocultar carrito (modal)
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');

    // Asegúrate de que el modal esté oculto al cargar la página
    cartModal.style.display = 'none';

    cartBtn.addEventListener('click', function() {
        openCart(); // Abre el modal del carrito
    });

    closeModal.addEventListener('click', function() {
        closeCart(); // Cierra el modal al hacer clic en el botón de cerrar
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCart(); // Cierra el modal si se hace clic fuera de él
        }
    });
});

// Función para abrir el modal del carrito
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
    actualizarCarrito(); // Actualiza la vista del carrito al abrir
}

// Función para cerrar el modal del carrito
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

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
                producto.quantity -= item.quantity; // Descuenta del inventario
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
        closeCart(); // Cierra el modal después de la compra
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

    loadProducts(); // Cargar los productos al iniciar
});
