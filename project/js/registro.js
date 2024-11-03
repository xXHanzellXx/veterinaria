// Registro de usuarios
function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    // Validación de campos
    if (!username || !password) {
        alert('Por favor, ingrese un usuario y contraseña válidos');
        return;
    }

    // Obtener usuarios existentes del localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!Array.isArray(users)) {
        users = []; // Aseguramos que `users` sea un array
    }

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('El usuario ya existe. Por favor, elija otro nombre de usuario.');
        return;
    }

    // Si el usuario no existe, agregar a la lista y guardar en localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Puedes iniciar sesión ahora.');

    // Limpiar el formulario y redirigir al inicio de sesión
    document.getElementById('register-form').reset();
    window.location.href = '../html/login.html';
}

// Agregar event listeners al cargar el contenido
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }
});
