// Función para agregar productos
function addProduct(event) {
    event.preventDefault();
    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const quantity = document.getElementById('product-quantity').value;
    const imageFile = document.getElementById('product-image').files[0];

    // Verificar que se haya ingresado todo
    if (!category || !name || !price || !description || !quantity || !imageFile) {
        alert('Por favor, ingrese todos los campos');
        return;
    }

    // Convertir la imagen en base64 para guardarla
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;

        // Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Crear el nuevo producto
        const newProduct = {
            category,
            name,
            price,
            description,
            quantity,
            image: imageDataUrl, // Guardar la imagen en base64
        };

        // Agregar el producto al arreglo y guardar en localStorage
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Producto agregado exitosamente');
        document.getElementById('add-product-form').reset(); // Limpiar el formulario
        displayProducts(); // Actualizar la lista de productos
    };
    reader.readAsDataURL(imageFile); // Leer la imagen como base64
}

// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', addProduct);
    }
});

// Al cargar la página de administrador, verificamos si es el admin 
function checkAdminAccess() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Verificar si el usuario está logueado y si es admin
    if (!loggedInUser || loggedInUser !== 'admin') {
        alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
        window.location.href = '../HTML/index.html'; // Redirigir al index si no es admin
    }
}

// Función para mostrar los productos en la página 
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar el contenido anterior
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        productList.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML =
            `<h2>${product.category}</h2>
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Descripción: ${product.description}</p>
            <p>Cantidad: ${product.quantity}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Eliminar</button>`;
        productList.appendChild(productDiv);
    });
}

// Llamar a la función para mostrar los productos cuando la página cargue 
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    checkAdminAccess(); // Verificar acceso de administrador
});

// Función para eliminar un producto 
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Eliminar el producto del array 
    products.splice(index, 1);

    // Guardar el nuevo array en localStorage 
    localStorage.setItem('products', JSON.stringify(products));

    // Actualizar la lista de productos en pantalla 
    displayProducts();
    alert('Producto eliminado correctamente.');
}

// Función para editar un producto
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Cargar la información del producto en el formulario
    const product = products[index];
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-quantity').value = product.quantity;

    // Cambiar el comportamiento del botón de agregar a actualizar 
    const form = document.getElementById('add-product-form');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Actualizar Producto';

    // Quitar el evento anterior 
    form.removeEventListener('submit', addProduct);

    // Añadir un nuevo evento para actualizar el producto 
    form.addEventListener('submit', function updateProduct(event) {
        event.preventDefault();

        // Actualizar el producto en el array
        products[index].category = document.getElementById('product-category').value;
        products[index].name = document.getElementById('product-name').value;
        products[index].price = document.getElementById('product-price').value;
        products[index].description = document.getElementById('product-description').value;
        products[index].quantity = document.getElementById('product-quantity').value;

        // Verificar si se ha seleccionado una nueva imagen
        const newImageFile = document.getElementById('product-image').files[0];
        if (newImageFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                products[index].image = event.target.result; // Actualizar la imagen si hay una nueva
                localStorage.setItem('products', JSON.stringify(products));
                alert('Producto actualizado correctamente.');
                submitButton.textContent = 'Agregar Producto';
                form.reset();
                displayProducts(); // Actualizar la lista de productos
            };
            reader.readAsDataURL(newImageFile); // Leer la nueva imagen
        } else {
            // Si no se selecciona una nueva imagen, solo guardar los cambios
            localStorage.setItem('products', JSON.stringify(products));
            alert('Producto actualizado correctamente.');
            submitButton.textContent = 'Agregar Producto';
            form.reset();
            displayProducts(); // Actualizar la lista de productos
        }

        // Restaurar el comportamiento original del formulario 
        form.removeEventListener('submit', updateProduct);
        form.addEventListener('submit', addProduct);
    });
}

// Manejo del menú hamburguesa
document.getElementById('hamburger-btn').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú 
});