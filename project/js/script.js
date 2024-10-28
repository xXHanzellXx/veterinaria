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

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
});


// Función para verificar si hay un usuario logueado y actualizar la navegación
function updateNav() {
   const loggedInUser = localStorage.getItem('loggedInUser');
   const loginLink = document.getElementById('login-link');
   const registerLink = document.getElementById('register-link');
   const logoutLink = document.getElementById('logout-link');
   const historialLink = document.getElementById('historial-link');
   const welcomeMessage = document.getElementById('welcome-message');
 
   if (loggedInUser) {
     // Si hay un usuario logueado
     loginLink.style.display = 'none';  // Ocultar el botón de login
     registerLink.style.display = 'none';  // Ocultar el botón de registro
     historialLink.style.display = 'inline';
     welcomeMessage.style.display = 'inline';  // Mostrar mensaje de bienvenida
     welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`;  // Mostrar nombre del usuario
     logoutLink.style.display = 'inline';  // Mostrar botón de cerrar sesión
   } else {
     // Si no hay usuario logueado
     loginLink.style.display = 'inline';  // Mostrar el botón de login
     registerLink.style.display = 'inline';  // Mostrar el botón de registro
     welcomeMessage.style.display = 'none';  // Ocultar el mensaje de bienvenida
     logoutLink.style.display = 'none';  // Ocultar el botón de cerrar sesión
   }
 }
 
 // Función para cerrar sesión
 function logoutUser() {
   localStorage.removeItem('loggedInUser');  // Eliminar usuario logueado de localStorage
   alert('Has cerrado sesión exitosamente.');
   updateNav();  // Actualizar la barra de navegación
   window.location.href = '/index.html';  // Redirigir a la página principal
 }
 
 // Evento para gestionar el cierre de sesión
 document.addEventListener('DOMContentLoaded', function() {
   updateNav();  // Llamar a la función para actualizar la navegación cuando la página cargue
 
   const logoutLink = document.getElementById('logout-link');
   if (logoutLink) {
     logoutLink.addEventListener('click', logoutUser);
   }
 });

 document.getElementById('hamburger-btn').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú
});


/* 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */
/* Cambio de modo oscuro - claro vs claro - oscuro */
document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Aplicar el tema guardado en localStorage
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = 'Modo Claro';
  } else {
    themeToggleBtn.textContent = 'Modo Oscuro';
  }

  // Evento de clic en el botón para alternar el tema
  themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Verificar el estado actual y actualizar el botón
    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = 'Modo Claro';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = 'Modo Oscuro';
      localStorage.setItem('theme', 'light');
    }
  });
});
/* 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */

// Función para cambiar el slide
function updateCarousel() {
  const offset = currentSlide * -100 / totalSlides;
  carousel.style.transform = `translateX(${offset}%)`;
}

// Función para mover al siguiente slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

// Función para mover al slide anterior
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Añadir eventos a los botones
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Movimiento automático cada 5 segundos
setInterval(nextSlide, 5000);


function toggleSidebar() {
  const sidebar = document.getElementById('promoSidebar');
  sidebar.classList.toggle('active');
}

// Menú hamburguesa
document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});