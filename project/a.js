
// Actualizar la visualización del carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartSubTotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    carrito.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.name} - ₡${item.price.toFixed(2)} - Cantidad: ${item.quantity} - Total: ₡${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
    });

    cartSubTotal.innerText = `₡${subtotal.toFixed(2)}`;
    cartTax.innerText = `₡${iva.toFixed(2)}`;
    cartTotal.innerText = `₡${total.toFixed(2)}`;
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
        cartModal.style.display = 'block'; // Muestra el modal al hacer clic
    });

    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none'; // Cierra el modal al hacer clic en el botón de cerrar
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none'; // Cierra el modal si se hace clic fuera de él
        }
    });
});
