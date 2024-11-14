import { showAlert } from './alert.js';

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get the form data
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Create the login payload
    const loginData = {
        usuario: usuario,
        password: password
    };

    try {
        // Make a POST request to the backend login endpoint
        const response = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful! Token:', data.token);

            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('tipoUsuario', JSON.stringify(data.tipoUsuario.nombre));
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

           // Redirect based on tipoUsuario
            if(data.tipoUsuario.nombre == "Administrador") {
                window.location.href = './admin.html';
            } else if(data.tipoUsuario.nombre == "Empleador") {
                window.location.href = './empleador_list_vacantes.html';
            } else if(data.tipoUsuario.nombre == "Empleado") {
                window.location.href = './empleado_project_list.html';
            }
        } else {
            showAlert('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.', 'danger');
        }
    } catch (error) {
        console.error('Error during login:', error);
        showAlert('Ha ocurrido un error del servidor. Por favor, inténtelo de nuevo.', 'danger');
    }
});