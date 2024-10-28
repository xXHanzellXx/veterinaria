// Inicio de sesión con verificación de administrador
function loginUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificación del administrador
    if (username === 'admin' && password === '1234') {
        alert(`Bienvenido, administrador`);
        console.log("Administrador logueado");
        localStorage.setItem('loggedInUser', 'admin'); // guardar en el localStorage
        window.location.href = '../HTML/admin.html'; // redirigir a la página de administrador
        return; // salir de la función
    }
    
    // Verificación del usuario normal
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert(`Bienvenido, ${user.username}`);
        localStorage.setItem('loggedInUser', username); // guardar el nombre de usuario logueado
        window.location.href = '/index.html'; // redirigir a la página principal
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});
